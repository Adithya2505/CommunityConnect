import express from 'express';

const router = express.Router();

// Hardcoded sample data - ALWAYS works
const sampleAnnouncements = [
  {
    _id: '1',
    title: "Water Supply Maintenance",
    description: "Water supply will be interrupted on Saturday from 9 AM to 3 PM for maintenance work. Please store water accordingly.",
    category: "Maintenance",
    author: "Admin",
    date: "2024-01-15T00:00:00.000Z",
    createdAt: "2024-01-10T00:00:00.000Z"
  },
  {
    _id: '2',
    title: "Community Cleanup Drive", 
    description: "Join us for a community cleanup drive this Sunday at 8 AM in the central park. Gloves and bags will be provided.",
    category: "Event",
    author: "Admin",
    date: "2024-01-20T00:00:00.000Z",
    createdAt: "2024-01-12T00:00:00.000Z"
  },
  {
    _id: '3',
    title: "Security System Upgrade",
    description: "The society security cameras are being upgraded this week. There might be temporary disruptions in CCTV coverage.",
    category: "Security",
    author: "Admin",
    date: "2024-01-18T00:00:00.000Z", 
    createdAt: "2024-01-14T00:00:00.000Z"
  }
];

// Get all announcements - ALWAYS returns sample data
router.get('/', (req, res) => {
  console.log('📢 Returning sample announcements data');
  res.json(sampleAnnouncements);
});

// Create new announcement
router.post('/', (req, res) => {
  const newAnnouncement = {
    ...req.body,
    _id: Date.now().toString(),
    date: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  sampleAnnouncements.unshift(newAnnouncement); // Add to beginning
  res.status(201).json(newAnnouncement);
});

// Delete announcement  
router.delete('/:id', (req, res) => {
  const index = sampleAnnouncements.findIndex(a => a._id === req.params.id);
  if (index !== -1) {
    sampleAnnouncements.splice(index, 1);
    res.json({ message: 'Announcement deleted successfully' });
  } else {
    res.status(404).json({ message: 'Announcement not found' });
  }
});

export default router;