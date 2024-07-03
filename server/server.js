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
const crossOrigins = [
  'http://localhost:3000',
  'http://172.20.10.14:3000'
]
const corsOptions = {
  origin: crossOrigins,
  optionsSuccessStatus: 200,
  credentials: true 
};
app.use(cors(corsOptions));
app.use(cookieParser())
app.use('/',require('./route'))


app.listen(PORT, ()=>{
  return   console.log(`app is running at port ${PORT}`)
})

// Routes
app.use('/api/stripe', require('./route'));
app.use('/', require('./route'));

// Server
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
