const router = require('express').Router();
const Project = require('../models/Project');
const Message = require('../models/Message');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

router.get('/', auth, async (_req, res) => {
  try {
    const [projectCount, messageCount, unreadCount, blogCount] = await Promise.all([
      Project.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Blog.countDocuments(),
    ]);

    const messages = await Message.find().sort({ createdAt: -1 });
    const messageByDay = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      messageByDay[key] = 0;
    }
    messages.forEach(m => {
      const key = new Date(m.createdAt).toISOString().slice(0, 10);
      if (key in messageByDay) messageByDay[key]++;
    });

    const visitorTrend = [320, 450, 380, 520, 610, 480, 540];
    const dayLabels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dayLabels.push(d.toLocaleDateString('en', { weekday: 'short' }));
    }

    res.json({
      projects: projectCount,
      messages: messageCount,
      unreadMessages: unreadCount,
      blogPosts: blogCount,
      visitors: 1284,
      chartData: {
        messages: dayLabels.map((day, i) => ({ name: day, value: Object.values(messageByDay)[i] || 0 })),
        visitors: dayLabels.map((day, i) => ({ name: day, value: visitorTrend[i] || 0 })),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
