const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const { connectDB } = require('./config/db');
const PORT = process.env.PORT || 8000;

const app = express();
connectDB();

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
  secret:'keyboard mouse',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, ttl: 14 * 24 * 60 * 60 }),
  cookie: {
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 14,
    domain: '.domain.com'
}
}));

// Routes
app.use('/api/stripe', require('./route'));
app.use('/', require('./route'));

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
