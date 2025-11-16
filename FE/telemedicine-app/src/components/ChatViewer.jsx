import { useState } from 'react';
import { getMessages } from '../services/chat.service';
import './ChatViewer.css';

/**
 * ChatViewer Component
 * Xem tin nhắn trong 1 chat room
 * Note: Để gửi tin nhắn realtime cần tích hợp WebSocket (STOMP)
 */
const ChatViewer = () => {
  const [chatRoomId, setChatRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!chatRoomId || chatRoomId.trim() === '') {
      alert('Vui lòng nhập Chat Room ID');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      const data = await getMessages(chatRoomId);
      setMessages(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Không thể tải tin nhắn');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-viewer-container">
      <h2>Xem Chat Room</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Nhập Chat Room ID"
          value={chatRoomId}
          onChange={(e) => setChatRoomId(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Đang tải...' : 'Xem tin nhắn'}
        </button>
      </form>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải tin nhắn...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <h3>⚠️ Có lỗi xảy ra</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && searched && messages.length === 0 && (
        <div className="empty-state">
          <p>Chưa có tin nhắn nào trong chat room này</p>
        </div>
      )}

      {!loading && !error && messages.length > 0 && (
        <div className="messages-container">
          <h3>Tin nhắn ({messages.length})</h3>
          <div className="messages-list">
            {messages.map((message, index) => (
              <div key={message.id || index} className={`message-bubble ${message.senderId}`}>
                <div className="message-header">
                  <span className="sender">User {message.senderId}</span>
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleString('vi-VN')}
                  </span>
                </div>
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-info">
            <p>💡 Để gửi tin nhắn realtime, cần tích hợp WebSocket (STOMP)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatViewer;
