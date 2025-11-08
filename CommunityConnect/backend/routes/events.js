// routes/events.js
import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST RSVP to event
router.post("/:id/rsvp", async (req, res) => {
  try {
    const { response, userId, username } = req.body;
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Remove existing RSVP from this user
    event.participants = event.participants.filter(
      participant => participant.userId !== userId
    );

    // Add new RSVP
    event.participants.push({
      userId,
      username,
      response,
      date: new Date()
    });

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create sample events
router.post("/sample", async (req, res) => {
  try {
    // Clear existing events
    await Event.deleteMany({});
    
    // Create sample events
    const sampleEvents = [
      {
        title: "Community Diwali Celebration",
        description: "Join us for a grand Diwali celebration with lights, fireworks, and traditional sweets. All residents are welcome!",
        date: new Date("2024-11-12"),
        time: "6:00 PM",
        location: "Community Hall",
        participants: [
          { userId: '1', username: 'John Doe', response: 'yes' },
          { userId: '2', username: 'Jane Smith', response: 'yes' },
          { userId: '3', username: 'Mike Johnson', response: 'maybe' }
        ]
      },
      {
        title: "Yoga Session",
        description: "Morning yoga session for all age groups. Bring your yoga mats and join us for a healthy start to the day.",
        date: new Date("2024-01-25"),
        time: "7:00 AM",
        location: "Central Park",
        participants: [
          { userId: '1', username: 'John Doe', response: 'yes' },
          { userId: '4', username: 'Sarah Wilson', response: 'no' }
        ]
      }
    ];

    const createdEvents = await Event.insertMany(sampleEvents);
    res.json({ message: "Sample events created", events: createdEvents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Make sure to use export default
export default router;