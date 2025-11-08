import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <div className="header-content">
          <h1>🏠 CommunityConnect</h1>
          <div className="header-actions">
            <button 
              className="profile-btn"
              onClick={() => navigate('/profile')}
            >
              👤 Profile
            </button>
            <button 
              className="settings-btn"
              onClick={() => navigate('/settings')}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Options Grid */}
      <div className="main-options-grid">
        <div 
          className="option-card announcement-card"
          onClick={() => navigate('/announcements')}
        >
          <div className="option-icon">📢</div>
          <h3>Announcements</h3>
          <p>Latest community updates and notices</p>
        </div>

        <div 
          className="option-card events-card"
          onClick={() => navigate('/events')}
        >
          <div className="option-icon">📅</div>
          <h3>Upcoming Events</h3>
          <p>Community gatherings and activities</p>
        </div>

        <div 
          className="option-card discussions-card"
          onClick={() => navigate('/discussions')}
        >
          <div className="option-icon">💬</div>
          <h3>Discussions</h3>
          <p>Community conversations and topics</p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="home-footer">
        <div className="footer-options">
          <button 
            className="footer-btn"
            onClick={() => navigate('/contact')}
          >
            📞 Contact Us
          </button>
          <button 
            className="footer-btn"
            onClick={() => navigate('/feedback')}
          >
            💭 Feedback
          </button>
        </div>
        <p className="footer-text">CommunityConnect - Making Communities Better</p>
      </footer>
    </div>
  );
};

export default Home;