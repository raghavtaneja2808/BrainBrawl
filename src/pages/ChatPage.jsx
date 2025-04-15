import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import AuthContext from '@/assets/AuthContext';
import axios from 'axios';

const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const { otherUserId } = useParams();
  const [receiverName, setReceiverName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const roomIdRef = useRef('');

  // Fetch receiver's name using their ID
  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/details/user/${otherUserId}`);
        setReceiverName(res.data.name || 'User');
      } catch (err) {
        setReceiverName('User');
      }
    };

    if (otherUserId) {
      fetchReceiver();
    }
  }, [otherUserId]);

  // Join socket room
  useEffect(() => {
    if (!user || !otherUserId) return;

    const roomId = [user._id, otherUserId].sort().join('_');
    roomIdRef.current = roomId;

    if (!socket.connected) socket.connect();
    socket.emit('join_room', { roomId });

    const handleReceiveMessage = (data) => {
      if (data.senderId !== user._id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.emit('leave_room', { roomId });
    };
  }, [user, otherUserId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      roomId: roomIdRef.current,
      senderId: user._id,
      senderName: user.name,
      message,
    };

    socket.emit('send_message', msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Chat with {receiverName}</h2>

      <div className="flex-1 bg-white p-4 rounded shadow overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.senderId === user._id ? 'text-right' : 'text-left'}`}
          >
            <span className="font-semibold">
              {msg.senderId === user._id ? 'You' : receiverName}:
            </span>{' '}
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
