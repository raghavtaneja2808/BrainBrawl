import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ChatPage = () => {
  const [theme, setTheme] = useState('light');
  const [showChallenge, setShowChallenge] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const mockUser = {
    id: 1,
    name: 'You',
    avatar: 'https://i.pravatar.cc/40?img=1'
  };

  const otherUser = {
    id: 2,
    name: 'Alex',
    avatar: 'https://i.pravatar.cc/40?img=2'
  };

  const [messages, setMessages] = useState([
    {
      id: 101,
      sender: otherUser,
      text: 'Hey! Ready for the quiz challenge? 😄',
      timestamp: '2025-04-16T10:00:00Z'
    },
  ]);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: mockUser,
        text: input,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, newMsg]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleChallengeSubmit = () => {
    setShowChallenge(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInput(value);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 dark:bg-black relative`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className={`max-w-7xl mx-auto py-10 px-4 md:px-6 ${showChallenge ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold tracking-tight">Live Chat</h2>
          <p className="text-base text-gray-500 dark:text-gray-400">Chat with fellow quiz enthusiasts in real-time!</p>
        </div>

        <Card className="rounded-[2rem] border shadow-xl mt-[-40px]  bg-white dark:bg-black h-[80vh] flex flex-col justify-between">
          <div className="flex items-center gap-3 p-5 border-b bg-gradient-to-r mt-[-30px] from-purple-50 to-white dark:from-[#1a1a1a] dark:to-black rounded-t-[2rem]">
            <img src={otherUser.avatar} alt="avatar" className="rounded-full w-10 h-10 border-2 border-purple-500" />
            <div className='mt-[-20px]'>
              <p className="font-semibold text-gray-900 dark:text-white text-base">{otherUser.name}</p>
              <p className="text-xs text-gray-800 dark:text-white">Online</p>
            </div>
          </div>

          <CardContent className="p-6 overflow-y-auto flex-1 space-y-5 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender.id === mockUser.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-end space-x-2 max-w-[75%]">
                  {msg.sender.id !== mockUser.id && (
                    <img src={msg.sender.avatar} alt="avatar" className="rounded-full w-9 h-9 border-2 border-purple-500" />
                  )}
                  <div className={`p-4 rounded-3xl ${msg.sender.id === mockUser.id ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white' : 'bg-gray-200 text-gray-800'} shadow-md`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                    <p className="text-[0.7rem] mt-1 text-right opacity-60">{formatTime(msg.timestamp)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="flex items-center gap-4 p-5  border-t bg-white dark:bg-black">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-5 py-4 rounded-full text-sm bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 border border-gray-300 dark:border-gray-600"
            />
            <Button
              onClick={sendMessage}
              className="bg-gradient-to-br from-purple-600 to-purple-800 text-white px-6 py-4 rounded-full hover:from-purple-700 hover:to-purple-900 shadow-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21L21 12 3.75 3v7.5l12 1.5-12 1.5V21z" />
              </svg>
              Send
            </Button>
            <Button
              onClick={() => setShowChallenge(true)}
              className="bg-gradient-to-br from-pink-500 to-purple-600 text-white px-4 py-4 rounded-full shadow-lg"
            >
              🎮 Challenge
            </Button>
          </div>
        </Card>
      </div>

      <AnimatePresence>
        {showChallenge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white dark:bg-[#111] text-black dark:text-white rounded-2xl shadow-2xl max-w-xl w-full p-8 z-50"
            >
              <button
                onClick={() => setShowChallenge(false)}
                className="absolute top-4 right-4 text-lg text-gray-500 dark:text-white"
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">🚀 Challenge a Friend</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">🎯 Category</label>
                  <Input placeholder="e.g. Science, History, Sports..." className={theme === 'dark' ? 'bg-[#1a1a1a] text-white placeholder-gray-400' : 'bg-white border border-gray-300 placeholder-gray-600'} />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">🔢 Number of Questions</label>
                  <Input
                    placeholder="e.g. 5, 10, 15..."
                    value={input}
                    onChange={handleNumberChange}
                    className={theme === 'dark' ? 'bg-[#1a1a1a] text-white placeholder-gray-400' : 'bg-white border border-gray-300 placeholder-gray-600'}
                  />
                </div>
              </div>
              <div className="mt-6 text-right">
                <Button
                  onClick={handleChallengeSubmit}
                  className="bg-gradient-to-br from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 shadow-md"
                >
                  🎮 Send Challenge
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50"
          >
            ✅ Challenge sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPage;
