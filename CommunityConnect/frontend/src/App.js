import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Announcements from './pages/Announcements';
import AddAnnouncement from './pages/AddAnnouncement';
import Events from './pages/Events';
import Discussions from './pages/Discussions';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ContactUs from './pages/ContactUs';
import Feedback from './pages/Feedback';
import './App.css';

function App() {
  // Set admin status for demo
  React.useEffect(() => {
    localStorage.setItem('isAdmin', 'true');
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/add-announcement" element={<AddAnnouncement />} />
          <Route path="/events" element={<Events />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;