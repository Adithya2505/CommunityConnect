import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    navigate('/');
  };

  const contactInfo = [
    {
      icon: '🏢',
      title: 'Society Office',
      details: [
        'CommunityConnect Apartment Complex',
        '123 Green Valley Road',
        'Mumbai, Maharashtra 400001'
      ]
    },
    {
      icon: '📞',
      title: 'Phone Numbers',
      details: [
        'Office: +91 22 1234 5678',
        'Emergency: +91 98765 43210',
        'Security: +91 98765 43211'
      ]
    },
    {
      icon: '🕒',
      title: 'Office Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 2:00 PM',
        'Sunday: Closed'
      ]
    },
    {
      icon: '📧',
      title: 'Email Addresses',
      details: [
        'General: office@communityconnect.com',
        'Maintenance: maintenance@communityconnect.com',
        'Security: security@communityconnect.com'
      ]
    }
  ];

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: '🚔' },
    { name: 'Fire Department', number: '101', icon: '🚒' },
    { name: 'Ambulance', number: '102', icon: '🚑' },
    { name: 'Emergency Helpline', number: '112', icon: '🆘' }
  ];

  return (
    <div className="contact-container">
      <div className="contact-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>📞 Contact Us</h1>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <h2>🏘️ Society Information</h2>
          <div className="contact-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-card">
                <div className="contact-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <div className="contact-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="emergency-section">
          <h2>🆘 Emergency Contacts</h2>
          <div className="emergency-grid">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="emergency-card">
                <div className="emergency-icon">{contact.icon}</div>
                <div className="emergency-info">
                  <h4>{contact.name}</h4>
                  <p className="emergency-number">{contact.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form-section">
          <h2>✉️ Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter the subject of your message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Type your message here..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                📤 Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="management-section">
          <h2>👥 Management Committee</h2>
          <div className="management-grid">
            <div className="management-card">
              <h4>Chairperson</h4>
              <p>Mr. Rajesh Kumar</p>
              <p>📞 +91 98765 43212</p>
            </div>
            <div className="management-card">
              <h4>Secretary</h4>
              <p>Ms. Priya Sharma</p>
              <p>📞 +91 98765 43213</p>
            </div>
            <div className="management-card">
              <h4>Treasurer</h4>
              <p>Mr. Amit Patel</p>
              <p>📞 +91 98765 43214</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;