import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import AuthContext from '@/assets/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const createSvgDataUri = (svgString) => {
  if (typeof svgString === 'string' && svgString.trim().startsWith('<svg')) {
    const sanitizedSvg = svgString.replace(/<script.*?<\/script>/gs, '');
    return `data:image/svg+xml;utf8,${encodeURIComponent(sanitizedSvg)}`;
  }
  if (svgString != null && svgString !== '') {
    console.warn("Invalid SVG string:", svgString);
  }
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23aaa"><circle cx="50" cy="50" r="45"/><text x="50" y="70" font-size="50" text-anchor="middle" fill="%23fff">?</text></svg>';
};

const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const { otherUserId } = useParams();
  const [theme, setTheme] = useState('light');
  const [showChallenge, setShowChallenge] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [receiverName, setReceiverName] = useState('User');
  const [receiverAvatar, setReceiverAvatar] = useState(createSvgDataUri(null));
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [challengeParams, setChallengeParams] = useState({
    num: 5,
    difficulty: 'medium',
    type: 'multiple',
    category: 'general'
  });
  const [showIncomingChallenge, setShowIncomingChallenge] = useState(false);
  const [incomingChallengeData, setIncomingChallengeData] = useState(null);
  const messagesEndRef = useRef(null);
  const roomIdRef = useRef('');

  const currentUserAvatarDataUri = React.useMemo(() => 
    createSvgDataUri(user?.avatar), [user?.avatar]);

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/details/user/${otherUserId}`);
        setReceiverName(res.data.name || 'User');
        setReceiverAvatar(createSvgDataUri(res.data.photo));
      } catch (err) {
        console.error('Error fetching receiver:', err);
        setReceiverName('User');
        setReceiverAvatar(createSvgDataUri(null));
      }
    };
    if (otherUserId) fetchReceiver();
  }, [otherUserId]);

  useEffect(() => {
    if (!user?._id || !otherUserId) return;

    const roomId = [user._id, otherUserId].sort().join('_');
    roomIdRef.current = roomId;

    if (!socket.connected) socket.connect();
    socket.emit('join_room', { roomId });

    const handleReceiveMessage = (data) => {
      const isCurrentUser = data.senderId === user._id;
      setMessages(prev => [...prev, {
        id: Date.now() + Math.random(),
        sender: {
          id: data.senderId,
          name: isCurrentUser ? 'You' : receiverName,
          avatar: isCurrentUser ? currentUserAvatarDataUri : receiverAvatar
        },
        text: data.message,
        timestamp: new Date().toISOString()
      }]);
    };

    socket.on('receive_message', handleReceiveMessage);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.emit('leave_room', { roomId });
    };
  }, [user, otherUserId, receiverName, receiverAvatar, currentUserAvatarDataUri]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleReceiveChallenge = (data) => {
      if (data.toUserId === user._id) {
        setIncomingChallengeData(data);
        setShowIncomingChallenge(true);
      }
    };
  
    socket.on('receive_challenge', handleReceiveChallenge);
    return () => socket.off('receive_challenge', handleReceiveChallenge);
  }, [user._id]);
  
  const sendMessage = () => {
    if (!input.trim() || !user?._id) return;

    const msgData = {
      roomId: roomIdRef.current,
      senderId: user._id,
      senderName: user.name,
      message: input,
    };

    const newMsg = {
      id: Date.now() + Math.random(),
      sender: { 
        id: user._id, 
        name: 'You', 
        avatar: currentUserAvatarDataUri 
      },
      text: input,
      timestamp: new Date().toISOString(),
    };

    socket.emit('send_message', msgData);
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const handleChallengeSubmit = () => {
    socket.emit('send_challenge', {
      roomId: roomIdRef.current,
      fromUserId: user._id,
      toUserId: otherUserId,
    });
    setShowChallenge(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-black relative overflow-hidden">
      <Navbar theme={theme} setTheme={setTheme} />

      {!user || !receiverName ? (
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <p>Loading chat...</p>
        </div>
      ) : (
        <div className={`max-w-7xl mx-auto py-10 px-4 md:px-6 ${showChallenge ? 'blur-sm' : ''}`}>
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold tracking-tight dark:text-white">Live Chat</h2>
            <p className="text-base text-gray-500 dark:text-gray-400">Chatting with {receiverName}</p>
          </div>

          <Card className="rounded-[2rem] border dark:border-gray-700 shadow-xl bg-white dark:bg-black h-[calc(100vh-220px)] flex flex-col">
            <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700 bg-gradient-to-r from-purple-50 to-white dark:from-[#1a1a1a] dark:to-black rounded-t-[2rem]">
              <img 
                src={receiverAvatar} 
                alt="avatar" 
                className="rounded-full w-10 h-10 border-2 border-purple-500 object-cover"
              />
              <div>
                <p className="font-semibold dark:text-white">{receiverName}</p>
                <p className="text-xs text-green-600 dark:text-green-400">Online</p>
              </div>
            </div>

            <CardContent className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 scrollbar-thin scrollbar-thumb-purple-600">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender.id === user._id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end max-w-[75%] ${msg.sender.id === user._id ? 'flex-row-reverse' : ''}`}>
                    {msg.sender.id !== user._id && (
                      <img
                        src={msg.sender.avatar}
                        alt="avatar"
                        className="rounded-full w-9 h-9 border-2 border-purple-500 object-cover mr-2"
                      />
                    )}
                    <div className={`p-4 rounded-2xl ${
                      msg.sender.id === user._id 
                        ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-br-none'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                      <p className="text-[0.7rem] mt-1 text-right opacity-70">
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            <div className="flex items-center gap-2 p-4 border-t dark:border-gray-700 bg-white dark:bg-black">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 border-none"
              />
              <Button
                onClick={sendMessage}
                className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-full"
              >
                Send
              </Button>
              <Button
                onClick={() => setShowChallenge(true)}
                className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full"
              >
                🎮 Challenge
              </Button>
            </div>
          </Card>
        </div>
      )}

      <AnimatePresence>
        {showChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-md w-full"
            >
              <h2 className="text-xl font-bold mb-4">Challenge {receiverName}</h2>
              <Button 
                onClick={handleChallengeSubmit}
                className="w-full bg-gradient-to-br from-pink-500 to-purple-600"
              >
                Start Challenge
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Challenge sent! 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPage;