import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Peer from "peerjs";
import styles from "../styles/videoBar.module.css";


let isMounted = false
export default function VideoBar({
    socket,
    roomId,
    toggleMic,
    toggleVideo,
    toggleCam,
    userName,
}) {
    const videoGridRef = useRef(null);
    const [remoteVideos] = useState(new Map());
    const [selfVideo, setSelfVideo] = useState(null);
    const [selfStream, setSelfStream] = useState(null);
    const [selfId, setSelfId] = useState(null);
    const [streamReady, setStreamReady] = useState(false);

    useEffect(() => {
        isMounted = true
        const videoGrid = videoGridRef.current;
        const myPeer = new Peer();
        setSelfId(myPeer.id);
        const myVideo = document.createElement("video");
        myVideo.className = styles.myVideos;

        myVideo.muted = true;
        setSelfVideo(myVideo);
        const peers = {};
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {
                if (isMounted) {
                    setSelfStream(stream);
                    // setLoading(false)
                    addVideoStream(myVideo, stream);

                    myPeer.on("call", (call) => {
                        console.log("called by ", call.peer);

                        peers[call.peer] = call;
                        call.answer(stream);
                        const video = createRemoteVideo(call.peer);

                        call.on("stream", (userVideoStream) => {
                            addVideoStream(video, userVideoStream);
                        });
                    });
                    setStreamReady(true);
                    console.log("Stream ready");
                    socket.on("user-connected", (user) => {
                        connectToNewUser(user.userId, stream);
                    });
                }
                else {
                    stream.getTracks().forEach(track => { track.stop() })
                }
            });

        socket.on("user-disconnected", (userId) => {
            console.log("disconnect outside");

            let vid = remoteVideos.get(userId);
            console.log(vid);

            if (vid) vid.remove();
            console.log(peers[userId]);

            if (peers[userId]) {
                peers[userId].close();
            }
        });

        myPeer.on("open", (id) => {
            console.log("Peer Ready");

            if (isMounted) setSelfId(id);
        });

        function connectToNewUser(userId, stream) {
            console.log("connecting to user ", userId);

            const call = myPeer
                .call(userId, stream)
                .on("error", () => console.log("error happen"));
            const video = createRemoteVideo(userId);
            call.on("stream", (userVideoStream) => {
                addVideoStream(video, userVideoStream);
            });

            peers[userId] = call;
        }

        function addVideoStream(video, stream) {
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
                video.play();
            });
            videoGrid.append(video);
        }
        function createRemoteVideo(userId) {
            const video = document.createElement("video");
            video.className = styles.remoteVideos;
            remoteVideos.set(userId, video);
            return video;
        }
        return () => {
            isMounted = false
            console.log("cleanup called");
            socket.emit("video-disconnected", myPeer.id);
            socket.off("user-connected");
            socket.off("user-disconnected");
            remoteVideos.forEach((video) => video.remove());
            if (myVideo.srcObject)
                myVideo.srcObject.getTracks().forEach((track) => track.stop());
        };
    }, []);

    useEffect(() => {
        if (selfId != null && streamReady) {
            console.log("emitted join room");
            socket.emit("join-room", roomId, selfId, userName);
        }
    }, [streamReady, selfId]);

    useEffect(() => {
        if (toggleVideo) {
            remoteVideos.forEach((video) => (video.style.display = "inline"));
            if (selfVideo) selfVideo.style.display = "inline";
        } else {
            remoteVideos.forEach((video) => (video.style.display = "none"));
            if (selfVideo) selfVideo.style.display = "none";
        }
    }, [toggleVideo]);

    useEffect(() => {
        if (selfStream) {
            console.log("toggled cam", toggleCam);
            selfStream.getVideoTracks().forEach((track) => {
                track.enabled = toggleCam;
            });
            // if (!toggleCam) {
            //     navigator.mediaDevices.getUserMedia({
            //         video: true,
            //         audio: true
            //     }).then(stream => {
            //         setSelfStream(stream)
            //         // setLoading(false)
            //         selfVideo.srcObject = stream
            //     }
            //     )
            // }
        }
    }, [toggleCam]);

    useEffect(() => {
        if (selfStream) {
            console.log("toggled cam", toggleMic);

            selfStream.getAudioTracks()[0].enabled = toggleMic;
        }
    }, [toggleMic]);

    return (
        <>
            <div ref={videoGridRef}></div>
        </>
    );
}
