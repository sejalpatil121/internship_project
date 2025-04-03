const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const apiRoutes = require('./routes/api.routes');
require('dotenv').config();
const adminRoutes = require('./routes/admin.routes');
require('./services/redis.service');
require('./services/queue.service'); // Initialize queue

const app = express();

app.use(cors({
  origin: 'http://localhost:3001', // Your frontend URL
  credentials: true
}));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', apiRoutes);

const jobRoutes = require('./routes/jobs.routes');
app.use('/api', jobRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));