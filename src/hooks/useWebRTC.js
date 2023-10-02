import React from 'react';
import freeice from 'freeice';

import ACTIONS from '../consts/ACTIONS';

import useStateWithCallback from './useStateWithCallback.js';
import {socket} from '../utils/socket';

export const LOCAL_VIDEO = "LOCAL_VIDEO";

const useWebRTC = (roomId) => {
    const [clients, setClients] = useStateWithCallback([]);

    const addNewClient = React.useCallback((newClient, cb) => {
        if(!clients.includes(newClient)){
            setClients(list => {
                if(!list.includes(newClient)) {
                    return [...list, newClient]
                }
            
                return list;
            }, cb);
        }
    }, [clients, setClients]);

    const peerConnections = React.useRef({});
    const localMediaStream = React.useRef(null);
    const peerMediaElements = React.useRef({
        [LOCAL_VIDEO]: null
    });

    React.useEffect(() => {
        const handleNewPeer = async ({peerId, createOffer}) => {
            console.log("Нью пир");
            if(peerId in peerConnections.current){
                return console.warn(`Уже подключены к ${peerId}`);
            }

            peerConnections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice()
            });

            peerConnections.current[peerId].onicecandidate = event => {
                if(event.candidate){
                    socket.emit(ACTIONS.RELAY_ICE, {
                        peerId,
                        iceCandidate: event.candidate
                    });
                }
            }

            let tracksNumber = 0;
            peerConnections.current[peerId].ontrack = ({streams: [remoteStream]}) => {
                tracksNumber++;

                if(tracksNumber >= 1){ // video or audio
                    addNewClient(peerId, () => {
                        peerMediaElements.current[peerId].srcObject = remoteStream;
                    });
                }
            }

            localMediaStream.current.getTracks().forEach(track => {
                peerConnections.current[peerId].addTrack(track, localMediaStream.current);
            });

            if(createOffer){
                const offer = await peerConnections.current[peerId].createOffer();

                await peerConnections.current[peerId].setLocalDescription(offer);

                socket.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: offer,
                });
            }
        }

        socket.on(ACTIONS.ADD_PEER, handleNewPeer);

        return () => {
            socket.off(ACTIONS.ADD_PEER);
        }
    }, []);
  
    React.useEffect(() => {
      async function setRemoteMedia({peerId, sessionDescription: remoteDescription}) {
        await peerConnections.current[peerId]?.setRemoteDescription(
          new RTCSessionDescription(remoteDescription)
        );
  
        if (remoteDescription.type === 'offer') {
            const answer = await peerConnections.current[peerId]?.createAnswer();
    
            await peerConnections.current[peerId].setLocalDescription(answer);
    
            socket.emit(ACTIONS.RELAY_SDP, {
                peerId,
                sessionDescription: answer,
            });
        }
      }
  
      socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)
  
      return () => {
        socket.off(ACTIONS.SESSION_DESCRIPTION);
      }
    }, []);
  
    React.useEffect(() => {
        socket.on(ACTIONS.ICE_CANDIDATE, ({peerId, iceCandidate}) => {
            peerConnections.current[peerId]?.addIceCandidate(new RTCIceCandidate(iceCandidate));
        });
  
        return () => {
            socket.off(ACTIONS.ICE_CANDIDATE);
        }
    }, []);

    React.useEffect(() => {
        const handleRemovePeer = ({peerID}) => {
            if (peerConnections.current[peerID]) {
                peerConnections.current[peerID].close();
            }
        
            delete peerConnections.current[peerID];
            delete peerMediaElements.current[peerID];
        
            setClients(list => list.filter(c => c !== peerID));
        };
    
        socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    
        return () => {
            socket.off(ACTIONS.REMOVE_PEER);
        }
    }, []);

    React.useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                // video: true
            });

            addNewClient(LOCAL_VIDEO, () => {
                const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

                if(localVideoElement){
                    localVideoElement.volume = 0;
                    localVideoElement.srcObject = localMediaStream.current;
                }
            });
        }

        startCapture().then(() => socket.emit(ACTIONS.CALL, {room: roomId})).catch(e => console.error("Ошибка получения userMedia:", e));

        return () =>  {
            localMediaStream.current.getTracks().forEach(track => track.stop());
        }
    }, [roomId]);

    const provideMediaRef = React.useCallback((id, node) => {
        peerMediaElements.current[id] = node;
    }, []);

    return {
        clients,
        provideMediaRef
    }
}

export default useWebRTC;