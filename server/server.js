const express = require('express')
require('dotenv').config();
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const {connectDB} = require('./config/db')
const PORT = process.env.PORT || 8000
connectDB();



app.use(session({
  secret: "keyboard mouse",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14, 
    sameSite: 'None',
    secure: true,
    httpOnly: true 
  }
}));
app.use(cors({
  origin: 'https://shoe-haven.vercel.app',
  credentials: true
}));

app.use('/api/stripe',require('./route'))
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/',require('./route'))


app.listen(PORT, ()=>{
  return   console.log(`app is running at port ${PORT}`)
})


