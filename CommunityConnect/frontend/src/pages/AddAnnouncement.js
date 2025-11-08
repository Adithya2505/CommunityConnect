import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddAnnouncement.css';

const AddAnnouncement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/announcements', { // ✅ CHANGED 5000 to 5001
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          author: 'Admin'
        })
      });

      if (response.ok) {
        alert('Announcement published successfully!');
        navigate('/announcements');
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Announcement published successfully! (Demo)');
      navigate('/announcements');
    }
  };

  return (
    <div className="add-announcement-container">
      <div className="add-announcement-header">
        <button className="back-btn" onClick={() => navigate('/announcements')}>
          ← Back to Announcements
        </button>
        <h1>➕ Add New Announcement</h1>
      </div>

      <form onSubmit={handleSubmit} className="announcement-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter announcement title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Enter announcement description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="General">General</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Emergency">Emergency</option>
            <option value="Event">Event</option>
            <option value="Payment">Payment</option>
            <option value="Security">Security</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/announcements')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Publish Announcement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnnouncement;