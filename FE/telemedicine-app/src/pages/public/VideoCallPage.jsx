import { useState } from 'react';
import './VideoCallPage.css';

const VideoCallPage = ({ onClose, doctorName }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const handleEndCall = () => {
    onClose();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <div className="video-call-overlay">
      <div className="video-call-container">
        {/* Main Video Area */}
        <div className="main-video-area">
          <video className="main-video" autoPlay muted playsInline>
            {/* Video stream goes here */}
          </video>
          
          {/* Call Info */}
          <div className="call-info">
            <div className="call-time">11:35</div>
            <div className="call-participants">
              <span className="participant-icon">👥</span>
              <span>11:35 | 2 people in the call</span>
            </div>
          </div>

          {/* Remote Video (Small) */}
          <div className="remote-video-small">
            <video autoPlay playsInline>
              {/* Remote video stream */}
            </video>
          </div>

          {/* Control Buttons */}
          <div className="call-controls">
            <button 
              className={`control-btn mute-btn ${isMuted ? 'active' : ''}`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              <span className="icon">🎤</span>
            </button>

            <button 
              className={`control-btn video-btn ${isVideoOff ? 'active' : ''}`}
              onClick={toggleVideo}
              title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
            >
              <span className="icon">📹</span>
            </button>

            <button 
              className="control-btn end-call-btn"
              onClick={handleEndCall}
              title="End call"
            >
              <span className="icon">📞</span>
            </button>

            <button 
              className={`control-btn screen-share-btn ${isScreenSharing ? 'active' : ''}`}
              onClick={toggleScreenShare}
              title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
            >
              <span className="icon">🖥</span>
            </button>

            <button className="control-btn more-btn" title="More options">
              <span className="icon">⋮</span>
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="call-bottom-controls">
            <button className="bottom-control-icon" title="Settings">
              ⚙️
            </button>
            <button className="bottom-control-icon" title="Favorite">
              ❤️
            </button>
            <button className="bottom-control-icon" title="Add">
              ➕
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button className="close-call-btn" onClick={handleEndCall}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default VideoCallPage;
