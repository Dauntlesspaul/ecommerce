const express = require('express');
const router = express.Router();
const Newitems = require('./model/Items');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require('multer-s3');
require('dotenv').config();
const User = require('./model/User');
const Token = require('./model/token');
const main = require('./config/nodeMailer');

// AWS S3 Configuration
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCES_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
});

// Generate random token
const randomToken = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

// Multer S3 configuration
const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${randomToken()}.jpeg`);
    }
  })
});
const uploadMiddleware = upload.single('file');

// Routes
router.post('/upload', uploadMiddleware, async (req, res) => {
  try {
    const imageUrl = req.file.location;

    const addItem = new Newitems({
      imageurl: imageUrl,
      brand: req.body.brand,
      category: req.body.category,
      rating: req.body.rating,
      price: req.body.price,
      description: req.body.description,
      discountprice: req.body.discountprice,
      units: req.body.units,
      section: req.body.section
    });
    await addItem.save();
    console.log('New items added to the database!');

    return res.json({ message: 'File received' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/products/:brandname', async (req, res) => {
  try {
    const brandname = req.params.brandname.replace(/[-]/g, ' ');
    const data = await Newitems.find({ brand: brandname });
    const category = data[0].category;
    const id = data[0]._id;
    const related = await Newitems.aggregate([
      {
        $match: {
          $and: [
            { category: category },
            { _id: { $ne: id } }
          ]
        }
      },
      {
        $limit: 4
      }
    ]);

    return res.send({ data, related });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/landingpage', async (req, res) => {
  try {
    const newarrivals = await Newitems.aggregate([
      { $match: { section: 'newarrivals' } },
      { $limit: 4 }
    ]);

    const mencollections = await Newitems.aggregate([
      { $match: { section: 'men' } },
      { $limit: 4 }
    ]);

    const womencollections = await Newitems.aggregate([
      { $match: { section: 'women' } },
      { $limit: 4 }
    ]);

    const topsellers = await Newitems.aggregate([
      { $match: { section: 'topsellers' } },
      { $limit: 4 }
    ]);

    return res.send({ newarrivals, mencollections, womencollections, topsellers });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/men', async (req, res) => {
  try {
    let perPage = 6;
    let page = parseInt(req.query.page) || 1;

    let beforePage = page - 1;
    let afterPage = page + 1;
    const data = await Newitems.aggregate([
      { $match: { category: 'men' } },
      { $skip: perPage * page - perPage },
      { $limit: perPage }
    ]);

    const totalItems = await Newitems.countDocuments();
    const totalPages = Math.ceil(totalItems / perPage);
    return res.send({ data, beforePage, afterPage, page, totalPages });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/women', async (req, res) => {
  try {
    let perPage = 6;
    let page = parseInt(req.query.page) || 1;

    let beforePage = page - 1;
    let afterPage = page + 1;
    const data = await Newitems.aggregate([
      { $match: { category: 'women' } },
      { $skip: perPage * page - perPage },
      { $limit: perPage }
    ]);

    const totalItems = await Newitems.countDocuments();
    const totalPages = Math.ceil(totalItems / perPage);
    return res.send({ data, beforePage, afterPage, page, totalPages });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/search', async (req, res) => {
  try {
    const search = req.query.q;
    const noSpecialChars = search.replace(/[^a-zA-Z0-9\s]/g, '');
    const regex = new RegExp(noSpecialChars, 'i');

    if (noSpecialChars === 'men') {
      const data = await Newitems.aggregate([
        { $match: { category: noSpecialChars } }
      ]);
      return res.send(data);
    } else {
      const data = await Newitems.aggregate([
        {
          $match: {
            $or: [
              { brand: { $regex: regex } },
              { section: { $regex: regex } },
              { category: { $regex: regex } }
            ]
          }
        }
      ]);

      if (data) {
        return res.send(data);
      }
      return res.send('No data found');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/filter', async (req, res) => {
  try {
    const { selectedOption, name } = req.query;
    let data;
    if (name === 'By Ratings') {
      data = await Newitems.aggregate([
        { $match: { rating: selectedOption } }
      ]);
    } else if (name === 'By Category') {
      data = await Newitems.aggregate([
        { $match: { category: selectedOption } }
      ]);
    } else if (name === 'By Price') {
      if (selectedOption === '200less') {
        data = await Newitems.aggregate([
          { $match: { discountprice: { $lt: 200 } } }
        ]);
      } else if (selectedOption === 'below400') {
        data = await Newitems.aggregate([
          { $match: { discountprice: { $lt: 400 } } }
        ]);
      } else {
        data = await Newitems.aggregate([
          { $match: { discountprice: { $gt: 400 } } }
        ]);
      }
    }
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).send({ message: 'User with the given email already exists!' });
    }
    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hashedPassword = bcrypt.hashSync(password, salt);
    user = await new User({ ...req.body, password: hashedPassword }).save();
    const token = await new Token({
      userId: user._id,
      token: randomToken()
    }).save();
    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    const message = `Welcome to Shoe Haven ${user.firstname}, please follow the link to verify your email: ${url}`;
    await main(user.email, 'Email Verification', message);

    return res.status(201).send({ message: 'A verification link was sent to your email, please click on the link to verify your email' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.post('/resend-email-verification', async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email: email });

    if (user && !user.verified) {
      await Token.updateOne({ userId: user._id, token: randomToken() });
      const token = await Token.findOne({ userId: user._id });
      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      const message = `Welcome to Shoe Haven ${user.firstname}, please follow the link to verify your email: ${url}`;
      await main(user.email, 'Email Verification', message);

      return res.status(201).send({ message: 'A verification link was sent to your email, please click on the link to verify your email' });
    }

    return res.status(404).send({ message: "User already verified" });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.post('/signin-with-google', async (req, res) => {
  const { given_name, family_name, email } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    return res.status(409).send({ message: 'User with the given email already exists!' });
  }

  const createUser = new User({
    firstname: given_name,
    lastname: family_name,
    email: email,
    verified: true
  });

  await createUser.save();
  console.log("User created");
  return res.status(201).send('User created');
});

router.post('/sign-in', async(req,res)=>{
  try{
    const {email, password} = req.body
    console.log(req.body)
    const user = await User.findOne({email: email})
    console.log(user)
    if(user){
      const match = await bcrypt.compare(password, user.password)
      if(match){
        return res.status(200).send({message: "access granted"})
      }else{
        return res.status(404).send({messgae: "User not found!"})
      }
    }
    return res.status(404).send({messgae: "User not found!"})
  }catch(error){
    return res.status(404).send({messgae: "User not found!"})
  }

})
router.get('/:id/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: 'Invalid link! User not found' });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });

    if (!token) {
      return res.status(500).send('Internal Server Error');
    }
    await User.updateOne({ _id: user._id, verified: true });
    await Token.deleteOne({ _id: token._id });
    return res.status(201).send({ message: 'Email verified successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
