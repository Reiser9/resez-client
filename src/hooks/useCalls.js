import React from "react";
import freeice from "freeice";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { CALL_STATUSES } from "../consts/CALL_STATUSES";

import { socket } from "../utils/socket";

import useAlert from "./useAlert";

import { setCallInfo, setCallStatus } from "../redux/slices/call";

const useCalls = () => {
    const [localStream, setLocalStream] = React.useState(null);
    const [remoteStream, setRemoteStream] = React.useState(null);
    const peerConnection = React.useRef(null);
    const medias = React.useRef({
        "LOCAL_VIDEO": null
    });

    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {alertNotify} = useAlert();

    const callRequest = (toUserId) => {
        const callId = v4();

        socket.emit("call-request", {
            callId,
            fromUserId: user.id,
            toUserId
        });
    }

    const acceptCall = (callId, toUserId) => {
        socket.emit("accept-call", {
            callId,
            fromUserId: user.id,
            toUserId
        });
    }

    React.useEffect(() => {
        const callInfoHandler = ({userData, callId}) => {
            dispatch(setCallInfo({user: userData, callId}));
            dispatch(setCallStatus(CALL_STATUSES.OUTCOMING));
        }

        socket.on("call-info", callInfoHandler);

        return () => {
            socket.off("call-info");
        }
    }, []);

    React.useEffect(() => {
        const callAcceptedHandler = async ({callId, fromUserId, toUserId}) => {
            try{
                const stream = await navigator.mediaDevices.getUserMedia({audio: true});
                setLocalStream(stream);

                const newPeerConnection = new RTCPeerConnection({
                    iceServers: freeice()
                });

                stream.getTracks().forEach(track => {
                    newPeerConnection.addTrack(track, stream);
                });

                newPeerConnection.onicecandidate = (event) => {
                    if(event.candidate){
                        socket.emit("ice-candidate", {
                            callId,
                            fromUserId: user.id,
                            toUserId: fromUserId,
                            iceCandidate: event.candidate
                        });
                    }
                }

                newPeerConnection.ontrack = (event) => {
                    setRemoteStream(event.streams[0]);
                    medias.current[toUserId].srcObject = event.streams[0];
                };
        
                const offer = await newPeerConnection.createOffer();
                await newPeerConnection.setLocalDescription(offer);
                peerConnection.current = newPeerConnection;
                
                socket.emit("session-description", {
                    callId,
                    fromUserId: user.id,
                    toUserId: fromUserId,
                    offer
                });
                dispatch(setCallStatus(CALL_STATUSES.PROCESS));
            }
            catch(error){
                alertNotify("Ошибка", "Ошибка", "error");
                console.log(error);
            }
        }

        socket.on("call-accepted", callAcceptedHandler);

        return () => {
            socket.off("call-accepted");
        }
    }, []);

    React.useEffect(() => {
        const sessionDescriptionHandler = async ({callId, fromUserId, toUserId, offer}) => {
            try{
                const stream = await navigator.mediaDevices.getUserMedia({audio: true});
                setLocalStream(stream);

                const newPeerConnection = new RTCPeerConnection({
                    iceServers: freeice()
                });

                stream.getTracks().forEach(track => {
                    newPeerConnection.addTrack(track, stream);
                });

                newPeerConnection.onicecandidate = (event) => {
                    if(event.candidate){
                        socket.emit("ice-candidate", {
                            callId,
                            fromUserId: user.id,
                            toUserId: fromUserId,
                            iceCandidate: event.candidate
                        });
                    }
                }

                newPeerConnection.ontrack = (event) => {
                    setRemoteStream(event.streams[0]);
                };
        
                await newPeerConnection?.setRemoteDescription(new RTCSessionDescription(offer));

                const answer = await newPeerConnection.createAnswer();
                await newPeerConnection.setLocalDescription(answer);
                peerConnection.current = newPeerConnection;
                
                socket.emit("answer-description", {
                    callId,
                    fromUserId: user.id,
                    toUserId: fromUserId,
                    answer
                });

                dispatch(setCallStatus(CALL_STATUSES.PROCESS));
            }
            catch(error){
                alertNotify("Ошибка", "Ошибка", "error");
                console.log(error);
            }
        }

        socket.on("session-description", sessionDescriptionHandler);

        return () => {
            socket.off("session-description");
        }
    }, []);

    React.useEffect(() => {
        const answerDescriptionHandler = async ({callId, fromUserId, toUserId, answer}) => {
            await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
        }

        socket.on("answer-description", answerDescriptionHandler);

        return () => {
            socket.off("answer-description");
        }
    }, []);

    React.useEffect(() => {
        const iceCandidateHandler = async ({callId, fromUserId, toUserId, iceCandidate}) => {
            await peerConnection.current?.addIceCandidate(new RTCIceCandidate(iceCandidate));
        }

        socket.on("ice-candidate", iceCandidateHandler);

        return () => {
            socket.off("ice-candidate");
        }
    }, []);

    return {
        medias,
        callRequest,
        acceptCall
    }
};

export default useCalls;