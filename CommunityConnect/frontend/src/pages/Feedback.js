import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';

const Feedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    rating: 5,
    message: '',
    anonymous: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your valuable feedback! We appreciate your input.');
    setFormData({
      name: '',
      email: '',
      category: 'general',
      rating: 5,
      message: '',
      anonymous: false
    });
    navigate('/');
  };

  const feedbackCategories = [
    { value: 'general', label: 'General Feedback', icon: '💬' },
    { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { value: 'security', label: 'Security', icon: '👮' },
    { value: 'cleanliness', label: 'Cleanliness', icon: '🧹' },
    { value: 'amenities', label: 'Amenities', icon: '🏊' },
    { value: 'management', label: 'Management', icon: '👥' },
    { value: 'suggestion', label: 'Suggestion', icon: '💡' },
    { value: 'complaint', label: 'Complaint', icon: '⚠️' }
  ];

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>💭 Feedback & Suggestions</h1>
      </div>

      <div className="feedback-content">
        <div className="feedback-info">
          <h2>We Value Your Opinion! 🌟</h2>
          <p>Your feedback helps us improve our community services and make CommunityConnect better for everyone.</p>
          
          <div className="feedback-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <h3>95%</h3>
              <p>Issues Resolved</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <h3>24h</h3>
              <p>Average Response Time</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👍</div>
              <h3>4.8/5</h3>
              <p>Resident Satisfaction</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-section">
            <h3>👤 Your Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!formData.anonymous}
                  disabled={formData.anonymous}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required={!formData.anonymous}
                  disabled={formData.anonymous}
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Submit anonymously
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>📋 Feedback Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {feedbackCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Rating:</label>
                <div className="rating-section">
                  {[1, 2, 3, 4, 5].map(star => (
                    <label key={star} className="star-label">
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={formData.rating === star.toString()}
                        onChange={handleChange}
                      />
                      <span className={`star ${formData.rating >= star ? 'filled' : ''}`}>
                        {formData.rating >= star ? '⭐' : '☆'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Feedback:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Please share your detailed feedback, suggestions, or concerns..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              📤 Submit Feedback
            </button>
          </div>
        </form>

        <div className="feedback-guidelines">
          <h3>📝 Feedback Guidelines</h3>
          <div className="guidelines-list">
            <div className="guideline-item">
              <span className="guideline-icon">✅</span>
              <span>Be specific and provide details about your concern</span>
            </div>
            <div className="guideline-item">
              <span className="guideline-icon">✅</span>
              <span>Suggest practical solutions when possible</span>
            </div>
            <div className="guideline-item">
              <span className="guideline-icon">✅</span>
              <span>Maintain a respectful and constructive tone</span>
            </div>
            <div className="guideline-item">
              <span className="guideline-icon">✅</span>
              <span>Include relevant dates and locations if applicable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;