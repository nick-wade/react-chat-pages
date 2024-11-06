import '../css/Chat.css';
import '../css/Navbar.css';
import Navbar from '../components/Navbar.js';
import { ref, push, onChildAdded } from "firebase/database";
import { useState, useEffect, useRef } from 'react';
import database from '../components/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Chat() {
    const navigate = useNavigate();
    const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [replying, setReplying] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const messagesEndRef = useRef(null);
    if (!sessionData){
        navigate('/Login')
    }

    useEffect(() => {
        const messagesRef = ref(database, 'messages');

        const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
            const newMessage = snapshot.val();
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        const messagesRef = ref(database, 'messages');
        push(messagesRef, {
            id: uuidv4(),
            text: message,
            name: sessionData.username,
            timestamp: Date.now(),
            replyTo: replyTo ? replyTo.id : null,
        });

        setMessage('');
        setReplying(false);
        setReplyTo(null);
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours %= 12;
        hours = hours || 12;
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    };

    const handleDoubleClick = (msg) => {
        setReplying(true);
        setReplyTo(msg);
    };

    return (
        <div className='chat-container'>
            <Navbar />
            
            <ul id='messages'>
                {messages.map((msg, index) => (
                    <li 
                        key={index} 
                        className='message' 
                        onDoubleClick={() => handleDoubleClick(msg)}
                    >
                        <div className='message-header'>
                            <span className='message-name'>
                            {msg.name}
                            {msg.replyTo && (
                            <div className='reply-message'>
                                &gt;&gt; {messages.find(m => m.id === msg.replyTo)?.name}: {messages.find(m => m.id === msg.replyTo)?.text}
                            </div>
                        )}
                        </span>
                            <span className='message-date'>{formatTimestamp(msg.timestamp)}</span>
                        </div>

                        <div className='message-text'>{msg.text}</div>
                    </li>
                ))}
                <div ref={messagesEndRef} />
            </ul>
            {replying && replyTo && (<div className='above-form-content'>
                <span className='replying-to'>Replying to {replyTo.name}</span>
                <button onClick={() => { setReplying(false); setReplyTo(null); }}>Cancel</button>
            </div>)}
            <form className='input-container' onSubmit={sendMessage}>
                <input
                    type='text'
                    placeholder='Type a message...'
                    className='message-input'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='send-button'>Send</button>
            </form>
        </div>
    );
}

export default Chat;
