import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import '../styles/VideoBar.css'


export default function VideoBar({ socket, roomId, toggleMic, toggleVideo, toggleCam }) {
    const videoGridRef = useRef(null);
    const [remoteVideos] = useState([]);
    const [selfVideo, setSelfVideo] = useState(null);


    useEffect(() => {
        console.log(document);

        const videoGrid = videoGridRef.current;
        const myPeer = new Peer()
        const myVideo = document.createElement('video')
        myVideo.className = 'myVideos'

        myVideo.muted = true
        setSelfVideo(myVideo)
        const peers = {}
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            addVideoStream(myVideo, stream)

            myPeer.on('call', call => {
                call.answer(stream)
                const video = document.createElement('video')
                // video.className = 'otherVideos'
                remoteVideos.push(video);

                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })
            })

            socket.on('user-connected', userId => {
                connectToNewUser(userId, stream)
            })
        })

        socket.on('user-disconnected', userId => {
            if (peers[userId]) peers[userId].close()
        })

        myPeer.on('open', id => {
            console.log("emitted join room");

            socket.emit('join-room', roomId, id)
        })

        function connectToNewUser(userId, stream) {
            const call = myPeer.call(userId, stream)
            const video = document.createElement('video')
            // video.className = 'otherVideos'
            remoteVideos.push(video)
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream)
            })
            call.on('close', () => {
                video.remove()
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

    return (
        <>
            <div ref={videoGridRef}>

            </div>
        </>
    );
}
