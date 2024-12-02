import logo from './logo.svg';
import React from 'react'; // Thêm dòng này
import './App.css';
import ChatApp from './component/chat-app'; // Đảm bảo rằng ChatApp được import đúng

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="chat-container">
        <ChatApp /> {/* Bọc ChatApp trong chat-container */}
      </div>
      </header>
    </div>
  );
}

export default App;
