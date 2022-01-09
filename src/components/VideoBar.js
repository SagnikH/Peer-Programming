import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import '../styles/VideoBar.css'

const peers = {}
let myPeer
let myVideo
let myStream
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
        myPeer = new Peer()
        setSelfId(myPeer.id)
        myVideo = document.createElement('video')
        myVideo.className = 'myVideos'

        myVideo.muted = true
        setSelfVideo(myVideo)
        // peers = {}
        navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true
        }).then(stream => {
            myStream = stream
            setSelfStream(stream)
            // setLoading(false)
            addVideoStream(myVideo, stream)

            myPeer.on('call', call => {
                console.log("called by ", call);

                peers[call.peer] = call;
                call.answer(stream)
                const video = createRemoteVideo(call.peer)

                call.peerConnection.ontrack = (event) => {
                    socket.on('video-toggled', userId => {
                        console.log("track added", event, userId);

                    })

                }

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
        // myPeer.on('connection', conn => {
        //     console.log("conn", conn);

        // })

        function connectToNewUser(userId, stream) {
            console.log("connecting to user ", userId);

            const call = myPeer.call(userId, stream).on('error', () => console.log("error happen"))
            const video = createRemoteVideo(userId);

            call.peerConnection.ontrack = (event) => {
                socket.on('video-toggled', userId => {
                    console.log("track added", event, userId);

                })

            }
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream)
            })

            console.log("call", call);

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
        return () => {
            console.log("cleanup called");
            socket.emit('video-disconnected', myPeer.id)
            socket.off('user-connected');
            socket.off('user-disconnected');
            remoteVideos.forEach(video => video.remove())
            myVideo.srcObject.getTracks().forEach(track => track.stop())

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


        // function replaceStream(peerConnection, mediaStream) {
        //     console.log(mediaStream.getAudioTracks()[0], mediaStream.getVideoTracks()[0]);



        //     if (mediaStream.getVideoTracks().length > 0) {
        //         console.log("adding");

        //         peerConnection.addTrack(mediaStream.getVideoTracks()[0]);
        //     }
        //     else {
        //         console.log("removing");
        //         for (const sender of peerConnection.getSenders()) {
        //             peerConnection.removeTrack(sender)
        //         }
        //     }
        // }
        function replaceStream(mediaStream) {
            for (const peer in peers) {
                console.log("loop", peers[peer]);

                if (!peers[peer].peerConnection) continue;
                for (const sender of peers[peer].peerConnection.getSenders()) {
                    peers[peer].peerConnection.removeTrack(sender);
                }

                mediaStream.getTracks().forEach(track => { peers[peer].peerConnection.addTrack(track) })
                socket.emit('video-toggled', selfId)
            }
        }


        if (selfStream) selfStream.getTracks().forEach(track => { track.stop() })
        if (toggleCam) {
            navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true
            }).then(stream => {
                myVideo.srcObject = stream;
                replaceStream(stream)
                setSelfStream(stream);
            })
        }
        else {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then(stream => {
                myVideo.srcObject = stream;
                replaceStream(stream)
                setSelfStream(stream);
            })
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
