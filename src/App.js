import './App.css';
import io from 'socket.io-client';
import { useEffect, useRef } from 'react';
import Peer from 'peerjs';
function App() {
  const videoGridRef = useRef(null);

  let socket
  let videoGrid
  let myPeer

  useEffect(() => {
    socket = io('http://localhost:3030');
    videoGrid = videoGridRef.current;
    myPeer = new Peer(undefined, {
      host: 'localhost',
      port: '3030',
      path: '/peerjs',
    })
    console.log(myPeer);


    //utility functions

    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream)
      const video = document.createElement('video')
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

    let myVideoStream;

    const myVideo = document.createElement('video')
    myVideo.muted = true;
    const peers = {}

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      myVideoStream = stream;
      addVideoStream(myVideo, stream)
      myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
      })

      socket.on('user-connected', userId => {
        console.log("lol");

        connectToNewUser(userId, stream)
      })
      // input value
      // let text = $("input");
      // // when press enter send message
      // $('html').keydown(function (e) {
      //   if (e.which == 13 && text.val().length !== 0) {
      //     socket.emit('message', text.val());
      //     text.val('')
      //   }
      // });
      // socket.on("createMessage", message => {
      //   $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
      //   scrollToBottom()
      // })
    })

    socket.on('user-disconnected', userId => {
      if (peers[userId]) peers[userId].close()
    })

    myPeer.on('open', id => {
      socket.emit('join-room', "aaa", id)
    })

  }, [])

  return (
    <>
      <div ref={videoGridRef}>

      </div>
    </>
  );
}

export default App;
