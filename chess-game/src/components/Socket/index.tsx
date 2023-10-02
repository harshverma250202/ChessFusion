import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketComponent: React.FC = () => {
  let socket: Socket;

  useEffect(() => {
    // Initialize Socket.io client
    socket = io('ws://localhost:5000');

    // Event listener for "message" event
    socket.on('message', (data: any) => {
      console.log('Message from server:', data);
    });

    // Event listener for successful connection
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      console.log('Disconnecting from server');
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Socket.io Client Component</h1>
    </div>
  );
};

export default SocketComponent;
