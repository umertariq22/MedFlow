import { useEffect,useRef,useState } from "react";
import {peerPromise} from '@/scripts/peerConnect';
const VideoCallComponent = ({ appointment_details }) => {
  const d = new Date();
  const [incomingCall,setIncomingCall] = useState(false);
  const [appointmentTime,setAppointmentTime] = useState(new Date().getTime() - appointment_details.appointment_date.getTime());
  useEffect(()=>{
    const remoteVideo = document.getElementById("remoteUser");
    const currentUserVideo = document.getElementById("currentUser");
    const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    const acceptCall = (call) => {
      getUserMedia({video:true,audio:true},(mediaStream) =>{
        currentUserVideo.srcObject = mediaStream;
        currentUserVideo.play();
        call.answer(mediaStream);
        call.on("stream",(remoteStream) =>{
          remoteVideo.srcObject = remoteStream;
          remoteVideo.play();
        })
      })
    }

    const callUser = (id) =>{
      getUserMedia({video:true,audio:true},(mediaStream) =>{
        currentUserVideo.srcObject = mediaStream;
        currentUserVideo.play();
        const call = peer.call(id,mediaStream);
        call.on("stream",(remoteStream) =>{
          remoteVideo.srcObject = remoteStream;
          remoteVideo.play();
        })
      })
    }



    peerPromise.then((peer) => {
      peer.on("open",(id) =>{
        console.log(id); 
      });
      peer.on("call",(call) =>{
        setIncomingCall(true);
      });
  });

  },[])

  return(<>
    <video id="remoteUser" autoPlay />
    <video id="currentUser" autoPlay muted />
    {appointmentTime }
    {incomingCall && <button onClick={acceptCall}>Accept Call</button>}<br/>
    {d.toLocaleString()}<br/>
    {appointment_details.appointment_date.toLocaleString()}
  </>);

}

export default VideoCallComponent;





// import { useEffect, useRef, useState } from 'react';
// import peer from'@/scripts/peerConnect';

// function VideoCallComponent() {
//   const [peerId, setPeerId] = useState('');
//   const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//   const [incomingCall, setIncomingCall] = useState();
//   const remoteVideoRef = useRef(null);
//   const currentUserVideoRef = useRef(null);
//   const peerInstance = useRef(null);

//   useEffect(() => {

//     peer.on('open', (id) => {
//       setPeerId(id)
//     });

//     peer.on('call', (call) => {
//       setIncomingCall(call);
//     })

//     peerInstance.current = peer;
//   }, [])

//   const call = (remotePeerId) => {
//     if (typeof window !== 'undefined') {
//       var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//       getUserMedia({ video: true, audio: true }, (mediaStream) => {

//         currentUserVideoRef.current.srcObject = mediaStream;
//         currentUserVideoRef.current.play();

//         const call = peerInstance.current.call(remotePeerId, mediaStream)

//         call.on('stream', (remoteStream) => {
//           remoteVideoRef.current.srcObject = remoteStream
//           remoteVideoRef.current.play();
//         });
//       });
//     }
//   }

//   const answerCall = () => {
//     if (typeof window === 'undefined') {
//       return;
//     }
//     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//     getUserMedia({ video: true, audio: true }, (mediaStream) => {
//       currentUserVideoRef.current.srcObject = mediaStream;
//       currentUserVideoRef.current.play();
      
//       incomingCall.answer(mediaStream);
//       incomingCall.on('stream', (remoteStream) => {
//         remoteVideoRef.current.srcObject = remoteStream
//         remoteVideoRef.current.play();
//       });
//     });
// }
//   return (
//     <div className="App">
//       <h1>Current user id is {peerId}</h1>
//       <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
//       <button onClick={() => call(remotePeerIdValue)}>Call</button>
//       <div>
//         <video id="currentUser" ref={currentUserVideoRef} muted/>
//       </div>
//       <div>
//         <video id="remoteUser" ref={remoteVideoRef} />
//       </div>
//       {incomingCall && <button onClick={answerCall}>Answer</button>}

//     </div>
//   );
// }

// export default VideoCallComponent;