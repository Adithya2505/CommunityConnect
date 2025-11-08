import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Announcements.css';
import axios from 'axios';

const Announcements = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const filtered = announcements.filter((announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAnnouncements(filtered);
  }, [searchTerm, announcements]);

  const fetchAnnouncements = async () => {
    try {
      // ❌ WRONG: axios.fetch()
      // ✅ FIXED: axios.get()
      const response = await axios.get('http://localhost:5001/api/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // Sample data fallback
      setAnnouncements([
        {
          _id: '1',
          title: "Water Supply Maintenance",
          description: "Water supply will be interrupted on Saturday from 9 AM to 3 PM for maintenance work. Please store water accordingly.",
          category: "Maintenance",
          date: "2024-01-15",
          author: "Admin"
        },
        {
          _id: '2',
          title: "Community Cleanup Drive",
          description: "Join us for a community cleanup drive this Sunday at 8 AM in the central park. Gloves and bags will be provided.",
          category: "Event",
          date: "2024-01-20",
          author: "Admin"
        },
        {
          _id: '3',
          title: "Security System Upgrade",
          description: "The society security cameras are being upgraded this week. There might be temporary disruptions in CCTV coverage.",
          category: "Security",
          date: "2024-01-18",
          author: "Admin"
        }
      ]);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/announcements/${id}`);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      setAnnouncements(announcements.filter((ann) => ann._id !== id));
    }
  };

  return (
    <div className="announcements-container">
      <div className="announcements-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>📢 Announcements</h1>
        {isAdmin && (
          <button
            className="add-announcement-btn"
            onClick={() => navigate('/add-announcement')}
          >
            + Add Announcement
          </button>
        )}
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search announcements by title, description, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="announcements-list">
        {filteredAnnouncements.length === 0 ? (
          <div className="no-announcements">
            <p>No announcements found.</p>
          </div>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <div key={announcement._id} className="announcement-card">
              <div className="announcement-header">
                <h3>{announcement.title}</h3>
                <span className="category-badge">{announcement.category}</span>
              </div>
              <p className="announcement-description">{announcement.description}</p>
              <div className="announcement-footer">
                <span className="announcement-date">
                  📅 {new Date(announcement.date).toLocaleDateString()}
                </span>
                <span className="announcement-author">👤 {announcement.author}</span>
                {isAdmin && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteAnnouncement(announcement._id)}
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
