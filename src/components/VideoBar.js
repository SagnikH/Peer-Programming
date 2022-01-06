import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import '../styles/VideoBar.css'


export default function VideoBar({ socket, roomId, toggleMic, toggleVideo, toggleCam, userName }) {
    const videoGridRef = useRef(null);
    const [remoteVideos] = useState(new Map());
    const [selfVideo, setSelfVideo] = useState(null);
    const [selfStream, setSelfStream] = useState(null);
    const [selfId, setSelfId] = useState(null);
    // const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log(document);

        const videoGrid = videoGridRef.current;
        const myPeer = new Peer()
        setSelfId(myPeer.id)
        const myVideo = document.createElement('video')
        myVideo.className = 'myVideos'

        myVideo.muted = true
        setSelfVideo(myVideo)
        const peers = {}
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            setSelfStream(stream)
            // setLoading(false)
            addVideoStream(myVideo, stream)

            myPeer.on('call', call => {
                console.log("called by ", call.peer);

                peers[call.peer] = call;
                call.answer(stream)
                const video = createRemoteVideo(call.peer)

                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })
            })
            // socket.emit("user-video-ready", selfId)
            // console.log("emitted ready");
            socket.on('user-connected', (user) => {
                connectToNewUser(user.userId, stream)
                // setTimeout(connectToNewUser,1000,user,stream)
            })
            console.log("emitted join room");

            socket.emit('join-room', roomId, selfId, userName)


        })

        socket.on('user-disconnected', userId => {
            console.log("disconnect outside");


            let vid = remoteVideos.get(userId);
            console.log(vid);

            if (vid) vid.remove();
            console.log(peers[userId]);

            if (peers[userId]) {
                peers[userId].close();
                console.log("INSIDE IF");
            }


        })

        myPeer.on('open', id => {

        })

        function connectToNewUser(userId, stream) {
            console.log("connecting to user ", userId);

            const call = myPeer.call(userId, stream).on('error', () => console.log("error happen"))
            const video = createRemoteVideo(userId);
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream)
            })

            peers[userId] = call

        }

        function addVideoStream(video, stream) {
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play()
            })
            videoGrid.append(video)
        }
        function createRemoteVideo(userId) {
            const video = document.createElement('video')
            video.className = 'remoteVideos'
            remoteVideos.set(userId, video);
            return video;
        }
    }, []);


    useEffect(() => {
        if (toggleVideo) {
            remoteVideos.forEach(video => video.style.display = 'inline')
            if (selfVideo) selfVideo.style.display = 'inline'
        }
        else {
            remoteVideos.forEach(video => video.style.display = 'none')
            if (selfVideo) selfVideo.style.display = 'none'
        }
    }, [toggleVideo])

    useEffect(() => {

        if (selfStream) {
            console.log("toggled cam", toggleCam);

            selfStream.getVideoTracks()[0].enabled = toggleCam;
        }


    }, [toggleCam])

    useEffect(() => {

        if (selfStream) {
            console.log("toggled cam", toggleMic);

            selfStream.getAudioTracks()[0].enabled = toggleMic;
        }


    }, [toggleMic])

    return (
        <>
            <div ref={videoGridRef}>

            </div>
        </>
    );
}
