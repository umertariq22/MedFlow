import { useState,useEffect } from "react";
import { io } from "socket.io-client";
let socket;
export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    useEffect(() => {
        initializeSocket();
        return () => {
            if(socket) {
                socket.off('message');
            }
        }
    }, []);

    const initializeSocket = async () => {
        await fetch('/api/Socket');
        socket = io(id);

        socket.on('message',(msg) => {
            setMessages((oldMsgs) => {
                return [...oldMsgs, { username: msg.username, message: msg.message }]
            });
        });
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        socket.emit('sendMessage', { username, message });
        setMessage('');
    }

    return (
        <div>
            <h1>Chat</h1>
            <form onSubmit={sendMessage}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
                <input type="submit"/>
            </form>
            <div>
                {messages.map((m, i) => (
                    <div key={i}>
                        <h3>{m.username}</h3>
                        <p>{m.message}</p>
                    </div>
                ))}
            </div>
        </div>
)};