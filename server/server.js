const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const {connectDB} = require('./config/db')
const PORT = process.env.PORT || 8000
connectDB();
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(bodyParser.json());
const crossOrigins = [
  'http://localhost:3000',
  'http://172.20.10.13:3000'
]
const corsOptions = {
  origin: crossOrigins ,
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use('/',require('./route'))


app.listen(PORT, ()=>{
  return   console.log(`app is running at port ${PORT}`)
})


