import { useEffect,useRef,useState } from "react";
import {peerPromise,generatePeerID} from '@/scripts/peerConnect';


const VideoCallComponent = ({ appointment_details,token_details }) => {
  const d = new Date();
  const [incomingCall,setIncomingCall] = useState(null);
  const [appointmentTime,setAppointmentTime] = useState(d.getTime() - appointment_details.appointment_date.getTime());
  const [remoteUserID,setRemoteUserID] = useState(null);

  const remoteVideo = useRef(null);
  const currentUserVideo = useRef(null);
  const peerInstance = useRef(null);
  
  const acceptCall = (call) => {
    if(!currentUserVideo.current || !remoteVideo.current || typeof window === "undefined"){
      return;
    }
    let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({video:true,audio:true},(mediaStream) =>{
      currentUserVideo.current.srcObject = mediaStream;
      currentUserVideo.current.play();
      call.answer(mediaStream);
      call.on("stream",(remoteStream) =>{
        remoteVideo.current.srcObject = remoteStream;
        remoteVideo.current.play();
      })
    })
  }

  const callUser = () =>{
    if(currentUserVideo.current === null || remoteVideo.current === null || typeof window === "undefined"){
      return;
    }
    let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({video:true,audio:true},(mediaStream) =>{
      currentUserVideo.current.srcObject = mediaStream;
      currentUserVideo.current.play();
      const call = peerInstance.current.call(remoteUserID,mediaStream);
      call.on("stream",(remoteStream) =>{
        remoteVideo.current.srcObject = remoteStream;
        remoteVideo.current.play();
      })
    })
  }
  
  useEffect(()=>{
    peerPromise.then((peer) => {
      peer.on("open",(id) =>{
        console.log(id); 
      });
      peer.on("call",(call) =>{
        setIncomingCall(call);
      });
      peerInstance.current = peer;
    });

    (async() =>{
      if (token_details.type === "patient") {
        setRemoteUserID(`doctor_${appointment_details.doctor_id}`);
      } else {
        setRemoteUserID(`patient_${appointment_details.patient_id}`);
      }
    })();
    
  },[])

  return(<>
    <video id="remoteUser" autoPlay ref={remoteVideo}/>
    <video id="currentUser" autoPlay muted ref={currentUserVideo}/>
    {incomingCall != null && <button onClick={() => acceptCall(incomingCall)}>Accept Call</button>}<br/>
    {appointmentTime > -(1000 * 60 * 15) && <button onClick={callUser}>Call User</button>}
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