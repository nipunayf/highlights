import React, { useState, useEffect } from 'react';

interface Message {
  [key: string]: any; // Adjust this interface based on the actual structure of your messages
}

const WebSocketComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:9091');

    // Function to send a message (if needed)
    const sendMessage = (message: Message) => {
      if (socket) {
        console.log('Sending message:', message);
        socket.send(JSON.stringify(message));
      }
    };

    // Save the WebSocket instance
    setSocket(ws);

    // Set up event listeners
    ws.onopen = () => {
      console.log('WebSocket connection established');
      if (ws) {
        console.log('Sending message:');
        ws.send(JSON.stringify({}));
      }
      console.log('Message sent');
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event);
      const message: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{JSON.stringify(message)}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
