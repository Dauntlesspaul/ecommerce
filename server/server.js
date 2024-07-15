const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const {handleWebhook} = require('./webhookController')
const { connectDB } = require('./config/db');
const PORT = process.env.PORT || 8000;
const path = require('path');

const app = express();


app.set('trust proxy', 1);

connectDB();

app.use('/api/stripe/webhook',express.raw({ type: 'application/json' }), handleWebhook)
const corsOptions = {
  origin: 'https://shoe-haven.vercel.app',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard mouse',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, ttl: 14 * 24 * 60 * 60 }),
  cookie: {
    secure: true, 
    sameSite: 'Lax', 
    maxAge: 1000 * 60 * 60 * 24 * 14, 
  }
}));

app.use('/api', require('./route'));
app.use(express.static(path.join(__dirname, '../client')));

// Catch-all handler to serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
