const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Fekadu' },
  title: { type: String, default: 'Full-Stack Developer' },
  bio: { type: String, default: "I'm a passionate developer who loves turning complex problems into simple, elegant solutions." },
  email: { type: String, default: '' },
  photo: { type: String, default: '' },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  stats: {
    yearsExperience: { type: Number, default: 3 },
    projectsCompleted: { type: Number, default: 20 },
    happyClients: { type: Number, default: 15 },
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
