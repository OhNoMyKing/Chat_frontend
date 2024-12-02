import React, { useState, useEffect } from 'react';

function ChatApp() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  // Mở kết nối WebSocket khi component được mount
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');  // Kết nối đến WebSocket server
    setSocket(ws);

    // Lắng nghe các tin nhắn từ server
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Lắng nghe sự kiện đóng kết nối
    ws.onclose = () => {
      console.log('Disconnected from server');
    };

    // Lắng nghe sự kiện lỗi
    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };

    // Đảm bảo đóng WebSocket khi component bị unmount
    return () => {
      if (ws) ws.close();
    };
  }, []);

  // Lấy tên người dùng
  useEffect(() => {
    let userName = prompt('What is your name?');
    while (!userName || userName.trim() === '') {
      userName = prompt('Please enter your name:');
    }
    setName(userName);
  }, []);

  // Xử lý khi gửi tin nhắn
  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() !== '' && socket) {
      // Gửi tin nhắn qua WebSocket
      socket.send(JSON.stringify({ name, message }));
      setMessage(''); // Xóa input message sau khi gửi
    }
  };

  return (
    <div>
      <h1>Chat With Me</h1>
      <ul id="message">
        {messages.map((msg, index) => (
          <li key={index}>{msg.name}: {msg.message}</li>
        ))}
      </ul>
      <form id="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="chat-mess"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button id="send-chat" type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatApp;
