// services/chatChallenge.js
const setupChatChallenge = (io) => {
    io.on('connection', (socket) => {
      console.log('⚡ New socket connected:', socket.id);
  
      // Join a private room (userId1_userId2 OR similar)
      socket.on('join_room', ({ roomId }) => {
        socket.join(roomId);
        console.log(`📥 Socket ${socket.id} joined room: ${roomId}`);
      });
  
      // Chat messages
      socket.on('send_message', ({ roomId, senderId, message }) => {
        const payload = {
          senderId,
          message,
          timestamp: new Date().toISOString(),
        };
  
        // Emit the message to everyone in the room except the sender
        socket.broadcast.to(roomId).emit('receive_message', payload); // Changed to broadcast
      });
  
      // Challenge request
      socket.on('send_challenge', ({ fromUserId, toUserId, roomId }) => {
        io.to(roomId).emit('receive_challenge', {
          fromUserId,
          toUserId,
          message: 'You have been challenged!',
        });
      });
  
      socket.on('disconnect', () => {
        console.log('❌ Socket disconnected:', socket.id);
      });
    });
  };
  
  module.exports = setupChatChallenge;
  