import { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import styles from "@/styles/videoCall.module.css";

export default function Video({ appointment_details, token_details }) {
  const [currentPeerID, setCurrentPeerID] = useState("");
  const [remotePeerID, setRemotePeerID] = useState("");
  const [callConnected, setCallConnected] = useState(false);
  const [callIncoming, setCallIncoming] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  let currentUserVideo = useRef();
  let remoteVideo = useRef();
  let peer = useRef();
  let conRef = useRef();
  let callRef = useRef();

  const callUser = () => {
    if (conRef.current == null) {
      conRef.current = peer.current.connect(remotePeerID);
      conRef.current.on("open", () => {
        console.log("connection opened");
      });
      conRef.current.on("data", (data) => {
        console.log(data);
        if (data == "call ended") {
          currentUserVideo.current?.srcObject.getTracks().forEach((track) => {
            track.stop();
          });
          setCallConnected(false);
          setCallEnded(true);
        }
      });
    }
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 }, audio: true })
      .then((stream) => {
        currentUserVideo.current.srcObject = stream;
        currentUserVideo.current.play();
        const call = peer.current.call(remotePeerID, stream);
        callRef.current = call;
        call.on("stream", (remoteStream) => {
          getRemoteStream(remoteStream);
          setCallConnected(true);
        });

        call.on("close", () => {
          console.log("call closed");
        });
      });
  };
  const endCall = () => {
    conRef.current.send("call ended");
    callRef.current.close();
    currentUserVideo.current?.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
    setCallConnected(false);
    setCallEnded(true);
  };
  const acceptCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 }, audio: true })
      .then((stream) => {
        currentUserVideo.current.srcObject = stream;
        currentUserVideo.current.play();
        callRef.current.answer(stream);
        callRef.current.on("stream", (remoteStream) => {
          getRemoteStream(remoteStream);
          setCallConnected(true);
        });
        callRef.current.on("close", () => {
          console.log("call closed");
        });
      });
  };
  useEffect(() => {
    let id = `${token_details.type}_${token_details.id}`;
    setCurrentPeerID(id);
    if (token_details.type === "doctor") {
      setRemotePeerID(`patient_${appointment_details.patient_id}`);
    } else {
      setRemotePeerID(`doctor_${appointment_details.doctor_id}`);
    }
    if (peer.current) {
      peer.current.destroy();
    }
    peer.current = new Peer(id, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
      debug: 3,
    });

    peer.current.on("open", (id) => {
      console.log("My peer ID is: " + id);
    });

    peer.current.on("connection", (conn) => {
      conRef.current = conn;
      conn.on("open", () => {
        console.log("connection opened");
      });
      conn.on("data", (data) => {
        console.log(data);
        if (data == "call ended") {
          currentUserVideo.current?.srcObject.getTracks().forEach((track) => {
            track.stop();
          });
          setCallConnected(false);
          setCallEnded(true);
        }
      });
    });
    peer.current.on("call", (call) => {
      callRef.current = call;
      setCallIncoming(true);
    });

    return () => {
      peer.current.destroy();
    };
  }, []);

  const toggleMute = () => {
    if (currentUserVideo.current?.srcObject) {
      currentUserVideo.current.srcObject.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (currentUserVideo.current?.srcObject) {
      currentUserVideo.current.srcObject.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setCameraEnabled(!cameraEnabled);
    }
  };

  const getRemoteStream = (stream) => {
    if (remoteVideo.current == null) {
      return;
    }
    remoteVideo.current.srcObject = stream;
    remoteVideo.current.play();
  };

  return (
    <>
      {!callEnded ? (
        <>
          <div className="container mt-4">
          <div className={styles.container}>
            <div className="row">
              <div className="col-md-12">
                <div className={styles.videocontainer}>
                  <video
                    ref={remoteVideo}
                    autoPlay
                    playsInline
                    className={styles.remoteuser}
                  />
                  <video
                    ref={currentUserVideo}
                    muted
                    autoPlay
                    playsInline
                    className={styles.currentuser}
                  />
                  {callIncoming && !callConnected && (
                    <div className="incoming-call">
                      <h1>Incoming Call</h1>
                      <button className="btn btn-success" onClick={acceptCall}>
                        Accept
                      </button>
                    </div>
                  )}
                  {callConnected && (
                    <div className={styles.controls}>
                      <button className={styles.endcall} onClick={endCall}>
                        <i className="bi bi-telephone"></i>
                      </button>
                      <button className={styles.mutecall} onClick={toggleMute}>
                        {isMuted ? <i className="bi bi-mic-mute"></i> : <i className="bi bi-mic"></i>}
                      </button>
                      <button className={styles.turnoffvideo} onClick={toggleVideo}>
                        {cameraEnabled ? <i className="bi bi-camera-video-fill"></i> : <i className="bi bi-camera-video-off-fill"></i>}
                      </button>
                    </div>
                  )}
                  {!callIncoming && !callConnected && (
                    <button className="btn btn-primary" onClick={callUser}>
                      Call
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        </>
      ) : (
        <div className="container">
          <h1 className="display-4">The appointment has ended</h1>
        </div>
      )}
    </>
  );
}
