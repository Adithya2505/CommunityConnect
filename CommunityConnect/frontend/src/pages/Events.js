import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [rsvpStatus, setRsvpStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentUser] = useState("Current User");

  const BASE_URL = "http://localhost:5001/api/events";

  // Sample events data
  const sampleEvents = [
    {
      _id: '1',
      title: "Community Diwali Celebration",
      description: "Join us for a grand Diwali celebration with lights, fireworks, and traditional sweets. All residents are welcome!",
      date: "2024-11-12",
      time: "6:00 PM",
      location: "Community Hall",
      participants: [
        { userId: '1', username: 'John Doe', response: 'yes' },
        { userId: '2', username: 'Jane Smith', response: 'yes' },
        { userId: '3', username: 'Mike Johnson', response: 'maybe' }
      ]
    },
    {
      _id: '2',
      title: "Yoga Session",
      description: "Morning yoga session for all age groups. Bring your yoga mats and join us for a healthy start to the day.",
      date: "2024-01-25",
      time: "7:00 AM",
      location: "Central Park",
      participants: [
        { userId: '1', username: 'John Doe', response: 'yes' },
        { userId: '4', username: 'Sarah Wilson', response: 'no' }
      ]
    },
    {
      _id: '3',
      title: "Neighborhood Cleanup",
      description: "Let's work together to clean up our neighborhood parks and streets. Gloves and bags will be provided.",
      date: "2024-02-15",
      time: "9:00 AM",
      location: "Main Street Park",
      participants: [
        { userId: '2', username: 'Jane Smith', response: 'yes' },
        { userId: '5', username: 'Robert Brown', response: 'maybe' }
      ]
    }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log("🌐 Fetching events from:", BASE_URL);
      const response = await fetch(BASE_URL);
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Events received:", data);
        
        // If backend returns empty array, use sample data
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        } else {
          console.log("📝 Using sample events data");
          setEvents(sampleEvents);
        }
      } else {
        // If fetch fails, use sample data
        console.log("📝 Using sample events due to fetch error");
        setEvents(sampleEvents);
      }
    } catch (error) {
      console.error('❌ Error fetching events, using sample data:', error);
      setEvents(sampleEvents);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId, response) => {
    try {
      console.log(`📝 RSVP for event ${eventId}: ${response}`);
      
      const res = await fetch(`${BASE_URL}/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          response,
          userId: 'current-user-id',
          username: currentUser 
        })
      });

      if (res.ok) {
        const updatedEvent = await res.json();
        setRsvpStatus(prev => ({
          ...prev,
          [eventId]: response
        }));
        // Update the specific event with new participant data
        setEvents(prev => prev.map(event => 
          event._id === eventId ? updatedEvent : event
        ));
      } else {
        throw new Error('RSVP failed');
      }
    } catch (error) {
      console.error('❌ RSVP error, updating locally:', error);
      // Update locally for demo
      setRsvpStatus(prev => ({
        ...prev,
        [eventId]: response
      }));
      
      // Update local events state
      setEvents(prev => prev.map(event => {
        if (event._id === eventId) {
          // Remove existing RSVP from this user
          const filteredParticipants = event.participants.filter(
            p => p.userId !== 'current-user-id'
          );
          
          // Add new RSVP
          const newParticipant = {
            userId: 'current-user-id',
            username: currentUser,
            response: response
          };
          
          return {
            ...event,
            participants: [...filteredParticipants, newParticipant]
          };
        }
        return event;
      }));
      
      alert(`RSVP recorded: ${response}`);
    }
  };

  const getParticipantCount = (event, status) => {
    return event.participants ? event.participants.filter(p => p.response === status).length : 0;
  };

  const getParticipantsByResponse = (event, response) => {
    return event.participants ? event.participants.filter(p => p.response === response) : [];
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Check if event is from sample data (for demo purposes)
  const isSampleEvent = (eventId) => {
    return sampleEvents.some(event => event._id === eventId);
  };

  if (loading) {
    return (
      <div className="events-container">
        <div className="loading">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>📅 Upcoming Events</h1>
        <div className="events-stats">
          {events.length} event{events.length !== 1 ? 's' : ''} found
          {events.some(event => isSampleEvent(event._id)) && (
            <span className="sample-badge">(Sample Data)</span>
          )}
        </div>
      </div>

      <div className="events-list">
        {events.length === 0 ? (
          <div className="no-events">
            <p>No upcoming events. Check back later!</p>
          </div>
        ) : (
          events.map(event => (
            <div key={event._id} className="event-card">
              {isSampleEvent(event._id) && (
                <div className="sample-indicator">Sample Event</div>
              )}
              
              <div className="event-header">
                <h3>{event.title}</h3>
                <div className="event-datetime">
                  <span className="event-date">📅 {formatDate(event.date)}</span>
                  <span className="event-time">⏰ {event.time}</span>
                </div>
              </div>
              
              <p className="event-location">📍 {event.location}</p>
              <p className="event-description">{event.description}</p>
              
              <div className="rsvp-section">
                <h4>Will you be attending?</h4>
                <div className="rsvp-buttons">
                  <button 
                    className={`rsvp-btn ${rsvpStatus[event._id] === 'yes' ? 'active going' : ''}`}
                    onClick={() => handleRSVP(event._id, 'yes')}
                  >
                    👍 Going ({getParticipantCount(event, 'yes')})
                  </button>
                  <button 
                    className={`rsvp-btn ${rsvpStatus[event._id] === 'maybe' ? 'active maybe' : ''}`}
                    onClick={() => handleRSVP(event._id, 'maybe')}
                  >
                    🤔 Maybe ({getParticipantCount(event, 'maybe')})
                  </button>
                  <button 
                    className={`rsvp-btn ${rsvpStatus[event._id] === 'no' ? 'active not-going' : ''}`}
                    onClick={() => handleRSVP(event._id, 'no')}
                  >
                    👎 Can't Go ({getParticipantCount(event, 'no')})
                  </button>
                </div>
              </div>

              <div className="participants-section">
                <div className="participants-details">
                  <div className="participant-group">
                    <h5>✅ Going ({getParticipantCount(event, 'yes')}):</h5>
                    <div className="participants-list">
                      {getParticipantsByResponse(event, 'yes').length > 0 ? (
                        getParticipantsByResponse(event, 'yes').map((participant, index) => (
                          <span key={index} className="participant-badge going">
                            {participant.username}
                          </span>
                        ))
                      ) : (
                        <span className="no-participants">No one going yet</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="participant-group">
                    <h5>🤔 Maybe ({getParticipantCount(event, 'maybe')}):</h5>
                    <div className="participants-list">
                      {getParticipantsByResponse(event, 'maybe').length > 0 ? (
                        getParticipantsByResponse(event, 'maybe').map((participant, index) => (
                          <span key={index} className="participant-badge maybe">
                            {participant.username}
                          </span>
                        ))
                      ) : (
                        <span className="no-participants">No maybes yet</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="participant-group">
                    <h5>👎 Can't Go ({getParticipantCount(event, 'no')}):</h5>
                    <div className="participants-list">
                      {getParticipantsByResponse(event, 'no').length > 0 ? (
                        getParticipantsByResponse(event, 'no').map((participant, index) => (
                          <span key={index} className="participant-badge not-going">
                            {participant.username}
                          </span>
                        ))
                      ) : (
                        <span className="no-participants">No declines yet</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;