import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import connectDB from './config/db.js';
import reportAircraftRoutes from './routes/api/reportAircraft.js';
import searchAreaRoutes from './routes/api/searchArea.js';
import searchPatternRoutes from './routes/api/searchPattern.js';
import rescueTeamRoutes from './routes/api/rescueTeam.js';
import usersRoutes from './routes/api/users.js';
import authRoutes from './routes/api/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ extended: false }));

// Connect to database
try {
  await connectDB();
  console.log('MongoDB Connected...');
} catch (err) {
  console.error('Database connection error:', err.message);
  process.exit(1);
}

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from API" });
});


// Define routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reportAircraft', reportAircraftRoutes);
app.use('/api/searchArea', searchAreaRoutes);
app.use('/api/searchPattern', searchPatternRoutes);
app.use('/api/rescueTeam', rescueTeamRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  .on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });
