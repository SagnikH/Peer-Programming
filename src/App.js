import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import VideoBar from './components/VideoBar.js';
const socket = io(process.env.REACT_APP_URL ?? 'https://video-test-ronak.herokuapp.com/')

function App() {
  const [remoteVideo, setRemoteVideo] = useState(true);
  const [cam, setCam] = useState(true);
  const [mic, setMic] = useState(true);
  return (
    <>
      <VideoBar socket={socket} roomId={'aaa'} toggleVideo={remoteVideo} toggleCam={cam} toggleMic={mic} userName={'ok'} />
      <button onClick={() => { setRemoteVideo(!remoteVideo) }}>Toggle Video</button>
      <button onClick={() => { setCam(!cam) }}>Toggle Cam</button>
      <button onClick={() => { setMic(!mic) }}>Toggle Mic</button>
    </>
  )
}

export default App;
