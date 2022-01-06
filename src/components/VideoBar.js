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
    const [streamReady, setStreamReady] = useState(false);


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
            video: false,
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
            setStreamReady(true);
            console.log("Stream ready");
            socket.on('user-connected', (user) => {
                connectToNewUser(user.userId, stream)
            })



        })

        socket.on('user-disconnected', userId => {
            console.log("disconnect outside");


            let vid = remoteVideos.get(userId);
            console.log(vid);

            if (vid) vid.remove();
            console.log(peers[userId]);

            if (peers[userId]) {
                peers[userId].close();
            }


        })

        myPeer.on('open', id => {
            console.log("Peer Ready");

            setSelfId(id);

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
        if (selfId != null && streamReady) {
            console.log("emitted join room");
            socket.emit('join-room', roomId, selfId, userName);
        }
    }, [streamReady, selfId])


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
        // function addVideoStream(video, stream) {
        //     video.srcObject = stream
        //     video.addEventListener('loadedmetadata', () => {
        //         video.play()
        //     })
        //     videoGridRef.current.append(video)
        // }

        if (selfStream && selfVideo) {
            console.log("toggled cam", toggleCam);
            if (toggleCam) {
                selfStream.getVideoTracks().forEach(tracks => tracks.stop())
            }
            else {
                navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }).then(stream => {
                    setSelfStream(stream)
                    // setLoading(false)
                    selfVideo.srcObject = stream
                }
                )
            }

        }
    }
        , [toggleCam])

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
