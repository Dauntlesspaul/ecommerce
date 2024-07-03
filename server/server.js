const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
const PORT = process.env.PORT || 8000;

const app = express();
connectDB();

// Middleware
app.use(cors({
  origin: 'https://shoe-haven.vercel.app',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/stripe', require('./route'));
app.use('/', require('./route'));

// Server
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
