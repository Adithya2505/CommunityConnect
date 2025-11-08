import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    smsAlerts: true,
    darkMode: false,
    analytics: true,
    communityMessages: true
  });
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
    }
  }, []);

  const handleSettingChange = (setting) => {
    const newSettings = {
      ...settings,
      [setting]: !settings[setting]
    };
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
    navigate('/');
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      notifications: true,
      emailUpdates: false,
      smsAlerts: true,
      darkMode: false,
      analytics: true,
      communityMessages: true
    };
    setSettings(defaultSettings);
    localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
    alert('Settings reset to default!');
  };

  // Apply dark mode changes immediately
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [settings.darkMode]);

  const handlePrivacySettings = () => {
    setShowPrivacyModal(true);
  };

  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>⚙️ Settings</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>🔔 Notification Settings</h3>
          <div className="setting-item">
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={() => handleSettingChange('notifications')}
              />
              <span className="slider"></span>
            </label>
            <div className="setting-info">
              <span className="setting-label">Push Notifications</span>
              <span className="setting-description">Receive push notifications for important updates</span>
            </div>
          </div>

          <div className="setting-item">
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.emailUpdates}
                onChange={() => handleSettingChange('emailUpdates')}
              />
              <span className="slider"></span>
            </label>
            <div className="setting-info">
              <span className="setting-label">Email Updates</span>
              <span className="setting-description">Get weekly email summaries</span>
            </div>
          </div>

          <div className="setting-item">
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={() => handleSettingChange('smsAlerts')}
              />
              <span className="slider"></span>
            </label>
            <div className="setting-info">
              <span className="setting-label">SMS Alerts</span>
              <span className="setting-description">Emergency alerts via SMS</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>🎨 Appearance</h3>
          <div className="setting-item">
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={() => handleSettingChange('darkMode')}
              />
              <span className="slider"></span>
            </label>
            <div className="setting-info">
              <span className="setting-label">Dark Mode</span>
              <span className="setting-description">Switch to dark theme</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>🔒 Privacy & Security</h3>
          <div className="privacy-buttons">
            <button className="privacy-btn" onClick={handlePrivacySettings}>
              👁️ Privacy Settings
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>🛠️ Account Management</h3>
          <div className="account-buttons">
            <button className="account-btn danger" onClick={() => alert('Account deactivation would proceed here')}>
              🚫 Deactivate Account
            </button>
            <button className="account-btn danger" onClick={() => alert('This will permanently delete your account!')}>
              🗑️ Delete Account
            </button>
          </div>
        </div>

        <div className="settings-actions">
          <button className="reset-settings-btn" onClick={handleResetSettings}>
            🔄 Reset to Default
          </button>
          <button className="save-settings-btn" onClick={handleSaveSettings}>
            💾 Save Settings
          </button>
        </div>
      </div>

      {/* Privacy Settings Modal */}
      {showPrivacyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>👁️ Privacy Settings</h2>
              <button className="close-btn" onClick={closePrivacyModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="privacy-option">
                <h4>Data Collection</h4>
                <div className="setting-item">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.analytics}
                      onChange={() => handleSettingChange('analytics')}
                    />
                    <span className="slider"></span>
                  </label>
                  <div className="setting-info">
                    <span className="setting-label">Usage Analytics</span>
                    <span className="setting-description">Help us improve by sharing usage data</span>
                  </div>
                </div>
              </div>

              <div className="privacy-option">
                <h4>Contact Preferences</h4>
                <div className="setting-item">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.communityMessages}
                      onChange={() => handleSettingChange('communityMessages')}
                    />
                    <span className="slider"></span>
                  </label>
                  <div className="setting-info">
                    <span className="setting-label">Allow Community Messages</span>
                    <span className="setting-description">Other members can contact you</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={closePrivacyModal}>
                ✅ Save Privacy Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;