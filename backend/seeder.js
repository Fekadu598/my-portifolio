const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Blog = require('./models/Blog');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '', liveUrl: '#', sourceUrl: '#', order: 1,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Interactive data visualization dashboard with real-time metrics, customizable widgets, and automated report generation.',
    tags: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    image: '', liveUrl: '#', sourceUrl: '#', order: 2,
  },
  {
    title: 'Fitness Tracker App',
    description: 'Cross-platform mobile app for tracking workouts, nutrition, and health goals with social features and AI-powered recommendations.',
    tags: ['React Native', 'Firebase', 'TensorFlow', 'GraphQL'],
    image: '', liveUrl: '#', sourceUrl: '#', order: 3,
  },
];

const skills = [
  { name: 'JavaScript', icon: 'code', order: 1 },
  { name: 'React', icon: 'layers', order: 2 },
  { name: 'Node.js', icon: 'server', order: 3 },
  { name: 'TypeScript', icon: 'type', order: 4 },
  { name: 'Python', icon: 'cpu', order: 5 },
  { name: 'PostgreSQL', icon: 'database', order: 6 },
  { name: 'Docker', icon: 'check-circle', order: 7 },
  { name: 'Git', icon: 'book', order: 8 },
];

const blogPosts = [
  {
    title: 'Building a Full-Stack Portfolio with MERN',
    excerpt: 'How I built my personal portfolio using MongoDB, Express, React, and Node.js with an integrated admin dashboard.',
    content: 'In this post, I walk through the architecture and design decisions behind my portfolio website. The backend uses Express and MongoDB for data storage, while the frontend is built with React. The admin dashboard allows me to manage projects, messages, and blog posts without touching code.',
    tags: ['React', 'Node.js', 'MongoDB'],
    published: true,
  },
  {
    title: 'Why I Switched to VS Code',
    excerpt: 'After years of using Sublime Text, here\'s why VS Code became my daily driver.',
    content: 'The extension ecosystem, integrated terminal, and Git support made VS Code an easy transition. Combined with Copilot, it\'s become indispensable for my workflow.',
    tags: ['Tools', 'Productivity'],
    published: true,
  },
  {
    title: 'Deploying Node.js Apps with Docker',
    excerpt: 'A practical guide to containerizing your Node.js applications for consistent deployments.',
    content: 'Docker eliminates the "works on my machine" problem. In this guide, I cover creating a Dockerfile, multi-stage builds, and docker-compose for local development.',
    tags: ['Docker', 'DevOps', 'Node.js'],
    published: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding');

    await User.deleteMany({});
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Blog.deleteMany({});

    await User.create({ email: 'fekadutigu@gmail.com', password: 'admin123' });
    console.log('Admin user created: fekadutigu@gmail.com / admin123');

    await Profile.create({
      name: 'Fekadu',
      title: 'Full-Stack Developer',
      bio: "I'm a passionate developer who loves turning complex problems into simple, elegant solutions. With a keen eye for design and a commitment to clean code, I build applications that are both functional and delightful to use.",
      email: 'fekadutigu@gmail.com',
      socialLinks: { github: 'https://github.com/fekadu', linkedin: 'https://linkedin.com/in/fekadu', twitter: 'https://twitter.com/fekadu' },
      stats: { yearsExperience: 3, projectsCompleted: 20, happyClients: 15 },
    });
    console.log('Profile seeded');

    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    await Blog.insertMany(blogPosts);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
}

seed();
