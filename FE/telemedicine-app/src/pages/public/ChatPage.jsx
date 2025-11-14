import { useState } from 'react';
import './ChatPage.css';
import VideoCallPage from './VideoCallPage';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'doctor',
      text: 'Xin chào,...........',
      timestamp: '10:30',
    },
    {
      id: 2,
      sender: 'patient',
      text: 'Xin chào,...........',
      timestamp: '10:31',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const chatList = [
    { id: 1, name: 'BS. Cao Quốc Hùng', lastMessage: 'Xin chào,...........' },
    { id: 2, name: 'BS. Cao Quốc Hùng', lastMessage: 'Xin chào,...........' },
    { id: 3, name: 'BS. Cao Quốc Hùng', lastMessage: 'Xin chào,...........' },
    { id: 4, name: 'BS. Cao Quốc Hùng', lastMessage: 'Xin chào,...........' },
    { id: 5, name: 'BS. Cao Quốc Hùng', lastMessage: 'Xin chào,...........' },
    { id: 6, name: 'BS. Cao Quốc Hùng', lastMessage: 'Xin chào,...........' },
  ];

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleVideoCall = () => {
    setIsVideoCallActive(true);
  };

  const handleEndVideoCall = () => {
    setIsVideoCallActive(false);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'patient',
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      {isVideoCallActive && (
        <VideoCallPage 
          onClose={handleEndVideoCall} 
          doctorName={selectedChat?.name}
        />
      )}
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-chat-list">
            <h2>Chat</h2>
          </div>
          <div className="header-chat-messages">
            {selectedChat ? (
              <>
                <div className="header-left">
                  <span className="chat-avatar"></span>
                  <span className="chat-doctor-name">{selectedChat.name}</span>
                </div>
                <div className="header-right">
                  <button className="header-icon-btn call-icon" title="Gọi điện">
                  </button>
                  <button 
                    className="header-icon-btn video-icon" 
                    title="Gọi video"
                    onClick={handleVideoCall}
                  >
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="chat-body">
          {/* Chat List */}
          <div className="chat-list">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => handleSelectChat(chat)}
              >
                <span className="avatar"></span>
                <div className="chat-info">
                  <h4>{chat.name}</h4>
                  <p>{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="chat-messages">
            {selectedChat ? (
              <>
                <div className="messages-area">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${message.sender === 'doctor' ? 'doctor-message' : 'patient-message'}`}
                    >
                      {message.sender === 'doctor' && (
                        <span className="message-avatar doctor"></span>
                      )}
                      <div className="message-content">
                        <p>{message.text}</p>
                      </div>
                      {message.sender === 'patient' && (
                        <span className="message-avatar patient"></span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="message-input-area">
                  <input
                    type="text"
                    className="message-input"
                    placeholder="Xin chao,..........."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button className="send-btn" onClick={handleSendMessage}>
                    {String.fromCharCode(10230)}
                  </button>
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <p>Chon mot cuoc tro chuyen de bat dau</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
