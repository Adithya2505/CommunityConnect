import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    apartment: '',
    floor: '',
    memberSince: '',
    familyMembers: ''
  });

  useEffect(() => {
    // Load profile data from localStorage or set defaults
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Set default values
      setProfile({
        name: 'Your Name',
        email: 'your.email@example.com',
        phone: '+91 9876543210',
        apartment: 'A-101',
        floor: '1',
        memberSince: '2023-01-01',
        familyMembers: '4'
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Profile updated successfully!');
    navigate('/');
  };

  const handleCancel = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>👤 My Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">👤</div>
          <h2>{profile.name || 'Your Name'}</h2>
        </div>

        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label>Apartment Number:</label>
              <input
                type="text"
                name="apartment"
                value={profile.apartment}
                onChange={handleChange}
                placeholder="e.g., A-101"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Floor:</label>
              <select name="floor" value={profile.floor} onChange={handleChange}>
                <option value="">Select Floor</option>
                {[...Array(25)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Floor {i + 1}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Family Members:</label>
              <select name="familyMembers" value={profile.familyMembers} onChange={handleChange}>
                <option value="">Select Count</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'member' : 'members'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Member Since:</label>
              <input
                type="date"
                name="memberSince"
                value={profile.memberSince}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="save-btn">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;