import React from 'react';
import freeice from 'freeice';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import {socket} from '../utils/socket';

import { ACTIONS } from '../consts/ACTIONS';
import { CALL_STATUSES } from '../consts/CALL_STATUSES';

import { setCallInfo, setCallStatus, setRingtonIsPlaying } from '../redux/slices/call';

import useAlert from './useAlert';
import useStateWithCallback from './useStateWithCallback';
import { playSound } from '../utils/playSound';

export const LOCAL_VIDEO = "LOCAL_VIDEO";

const useCalls = () => {
    const [clients, setClients] = useStateWithCallback([]);

    const addNewClient = React.useCallback((newClient, callback) => {
        setClients(list => {
            if(!list.includes(newClient)){
                return [...list, newClient];
            }

            return list;
        }, callback);
    }, [clients, setClients]);

    const {alertNotify} = useAlert();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    const peerConnections = React.useRef({});
    const localMediaStream = React.useRef(null);
    const peerMediaElements = React.useRef({
        [LOCAL_VIDEO]: null,
    });

    const requestCall = async (userId) => {
        const callId = v4();

        socket.emit(ACTIONS.CALL_REQUEST, {
            fromUserId: user?.id,
            toUserId: userId,
            callId
        });
    }

    // Кому звонит
    const requestCallHandler = (callData) => {
        dispatch(setCallInfo(callData));

        dispatch(setCallStatus(CALL_STATUSES.INCOMING));
        playSound("/assets/img/call.mp3");
    }

    // Кто звонит
    const calledUserInfoHandler = (callData) => {
        dispatch(setCallInfo(callData));
        dispatch(setCallStatus(CALL_STATUSES.OUTCOMING));
    }

    const startCapture = async () => {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({audio: true});

        addNewClient(LOCAL_VIDEO, () => {
            const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

            if(localVideoElement){
                localVideoElement.volume = 0;
                localVideoElement.srcObject = localMediaStream.current;
            }
        });
    }

    const acceptCall = (fromUserId, callId) => {
        socket.emit(ACTIONS.CALL_ACCEPT, {
            fromUserId: user.id,
            toUserId: fromUserId
        });

        startCapture()
        .then(() => socket.emit(ACTIONS.START_CALL, {callId}))
        .catch(() => alertNotify("Ошибка", "Для звонка требуется доступ к микрофону и камере", "error"));

        dispatch(setCallStatus(CALL_STATUSES.PROCESS));
    }

    const callAcceptHandler = () => {
        dispatch(setCallStatus(CALL_STATUSES.PROCESS));
    }

    const endCall = () => {


        dispatch(setCallStatus(CALL_STATUSES.DEFAULT));
    }

    // 
    const handleNewPeer = async ({peerId, createOffer}) => {
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
  
    const setRemoteMedia = async ({peerId, sessionDescription: remoteDescription}) => {
        await peerConnections.current[peerId]?.setRemoteDescription(new RTCSessionDescription(remoteDescription));
  
        if(remoteDescription.type === 'offer'){
            const answer = await peerConnections.current[peerId]?.createAnswer();
    
            await peerConnections.current[peerId].setLocalDescription(answer);
    
            socket.emit(ACTIONS.RELAY_SDP, {
                peerId,
                sessionDescription: answer,
            });
        }
    }
  
    const iceCandidateHandler = ({peerId, iceCandidate}) => {
        peerConnections.current[peerId]?.addIceCandidate(new RTCIceCandidate(iceCandidate));
    }

    const handleRemovePeer = ({peerId}) => {
        if (peerConnections.current[peerId]) {
            peerConnections.current[peerId].close();
        }
    
        delete peerConnections.current[peerId];
        delete peerMediaElements.current[peerId];
    
        setClients(list => list.filter(c => c !== peerId));
    }

    React.useEffect(() => {
        return () =>  {
            localMediaStream.current.getTracks().forEach(track => track.stop());
        }
    }, []);
    // 

    const provideMediaRef = React.useCallback((id, node) => {
        peerMediaElements.current[id] = node;
    }, []);

    return {
        clients,
        provideMediaRef,
        requestCall,
        requestCallHandler,
        calledUserInfoHandler,
        acceptCall,
        callAcceptHandler,
        iceCandidateHandler,
        handleRemovePeer,
        setRemoteMedia,
        handleNewPeer,
        endCall
    }
}

export default useCalls;