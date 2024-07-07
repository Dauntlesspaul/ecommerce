const express = require('express');
const router = express.Router();
const Newitems = require('./model/Items');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");;
const multerS3 = require('multer-s3');
require('dotenv').config();
const User = require('./model/User');
const Token = require('./model/token');
const { main, mainHTML } = require('./config/nodeMailer');
const Comment = require('./model/Comment')
const stripe = require('stripe')(process.env.STRIPE_KEYS)
const Cart = require('./model/Cart')
const ResetToken = require('./model/resettoken')
const Order = require('./model/Order')
// AWS S3 Configuration
const bucketName = process.env.BUCKET_NAME;
const bucketName2 = process.env.BUCKET_NAME2;
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

//jwtsecret
const jwtSecret = process.env.JWT_SECRET
// Middleware to verify JWT
/*const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Access Denied: Invalid Token');
  }
};*/

const authenticateToken = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Access Denied: Invalid Token');
  }
};

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

const profileUpload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName2,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      
      cb(null, `${randomToken()}.jpeg`);
    }
  })
}).single('file');



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
})

router.post('/profile-upload',profileUpload, authenticateToken, async(req, res) => {
    try {
      
      const { location } = req.file;
      const user_id = req.user.userId;
      let user = await User.findOne({ _id: user_id});

      if (!user) {
        return res.status(404).send({ 'message': 'User not found!' });
      }
      const url = user.profilePicture
      if(url){
      const parts = url.split('/')
      const key = parts[parts.length - 1]
      const params = {
        Bucket: bucketName2, 
        Key: key
      } 
      const deleteCommand = new DeleteObjectCommand(params);
      await s3.send(deleteCommand)
    }
      await User.updateOne({ _id: user._id }, { $set: { profilePicture: location } });
      user = await User.findOne({ _id: user._id });
      return res.status(200).send(user)

    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  });
  router.post('/remove-profile-pic', authenticateToken, async(req, res) => {
    try {
      
      
      const user_id = req.user.userId;
      let user = await User.findOne({ _id: user_id});

      if (!user) {
        return res.status(404).send({ 'message': 'User not found!' });
      }
      const url = user.profilePicture
      if(url){
      const parts = url.split('/')
      const key = parts[parts.length - 1]
      const params = {
        Bucket: bucketName2, 
        Key: key
      } 
      const deleteCommand = new DeleteObjectCommand(params);
      await s3.send(deleteCommand)
    }
      await User.updateOne({ _id: user._id }, { $set: { profilePicture: '' } });
      
      return res.status(200).send({message: 'Image successfully removed'})

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

    const totalItems = await Newitems.find({category: 'men'}).countDocuments();
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

    const totalItems = await Newitems.find({category: 'women'}).countDocuments();
    const totalPages = Math.ceil(totalItems / perPage);
    return res.send({ data, beforePage, afterPage, page, totalPages });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/allproducts',authenticateToken, async (req, res) => {
  try {
    let perPage = 6;
    let page = parseInt(req.query.page) || 1;
    let beforePage = page - 1;
    let afterPage = page + 1;

    const { rating, category, price, sort } = req.query;

    let filter = {};

    if (rating) {
      filter.rating = Number(rating);
    }
    if (category) {
      filter.category = category;
    }
    if (price) {
      if (price === "200less") {
        filter.discountprice = { $lt: 200 };
      } else if (price === "below400") {
        filter.discountprice = { $lt: 400 };
      } else if (price === "above400") {
        filter.discountprice = { $gte: 400 };
      }
    }

    /*let sortOption = {};
    if (sort) {
      if (sort === "newest") {
        sortOption.createdAt = -1;  
      } else if (sort === "oldest") {
        sortOption.createdAt = 1;
      } else if (sort === "mostPurchased") {
        sortOption.purchaseCount = -1;  
      }
    }*/
    const data = await Newitems.aggregate([
      { $match: filter },
      //{ $sort: sortOption },
      { $skip: perPage * page - perPage },
      { $limit: perPage }
    ]);

    const totalItems = await Newitems.find(filter).countDocuments();
    const totalPages = Math.ceil(totalItems / perPage);
    return res.send({ data, beforePage, afterPage, page, totalPages });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});
router.get('/search-store', async (req, res) => {

  try {
    let page = parseInt(req.query.page) || 1;
    let beforePage = page - 1;
    let afterPage = page + 1;
    
    const { q: search, rating } = req.query;
    const noSpecialChars = search.replace(/[^a-zA-Z0-9\s]/g, '');
    const regex = new RegExp(noSpecialChars, 'i');
    let query = {};

    if (noSpecialChars) {
      query.brand = { $regex: regex };
    }

    if (rating) {
      query.rating = rating;
    }

    const data = await Newitems.aggregate([
      { $match: query }
    ]);

    return res.send({ data, beforePage, afterPage, page});
    
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});


router.get('/search', async (req, res) => {
  try {
    const { q: search, rating } = req.query;
    const noSpecialChars = search.replace(/[^a-zA-Z0-9\s]/g, '');
    const regex = new RegExp(noSpecialChars, 'i');
    let query = {};

    if (noSpecialChars) {
      query.brand = { $regex: regex };
    }

    if (rating) {
      query.rating = rating;
    }

    const data = await Newitems.aggregate([
      { $match: query }
    ]);

      return res.send(data);
    
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});


router.get('/filter', async (req, res) => {
  try {
    let perPage = 6;
    let page = parseInt(req.query.page) || 1;
    let beforePage = page - 1;
    let afterPage = page + 1;
    let totalItems;

    const { selectedOption, name } = req.query;
    let data;
    let filter = {};

    if (name === 'By Ratings') {
      filter.rating = selectedOption;
    } else if (name === 'By Category') {
      filter.category = selectedOption;
    } else if (name === 'By Price') {
      if (selectedOption === '200less') {
        filter.discountprice = { $lt: 200 };
      } else if (selectedOption === 'below400') {
        filter.discountprice = { $lt: 400 };
      } else {
        filter.discountprice = { $gt: 400 };
      }
    }
    data = await Newitems.find(filter)
      .skip(perPage * (page - 1))
      .limit(perPage);

    totalItems = await Newitems.find(filter).countDocuments();
    const totalPages = Math.ceil(totalItems / perPage);

    return res.send({ data, beforePage, afterPage, page, totalPages });

  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
});


router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email.toLowerCase() });

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

router.post('/news-letter', async(req,res)=>{
 try{ const {email, text} = req.body
const message = text
  await mainHTML(email, 'News Letter', message);
  return res.status(200).send({message: 'news letter successfully sent'})
}catch(error){
 console.log(error)
}  
})


router.post('/resend-email-verification', async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email: email });

    if (user && !user.verified) {
      await Token.updateOne({ userId: user._id}, { $set: { token: randomToken()} });
      const token = await Token.findOne({ userId: user._id });
      if(!token){
        return res.status(400).send({message: 'Token not found!'})
      }
      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      const message = `Welcome to Shoe Haven ${user.firstname}, please follow the link to verify your email: ${url}`;
      await main(user.email, 'Email Verification', message);

      return res.status(201).send({ message: 'A verification link was sent to your email, please click on the link to verify your email' });
    }

    return res.status(404).send({ message: "User is already verified" });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.post('/new-email-verification', async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email: email });
    if (user && !user.verified) {
      const exist = await Token.findOne({userId : user._id})
      if(exist){
      await Token.updateOne({ userId: user._id},{$set: {token: randomToken()}});
      const token = await Token.findOne({ userId: user._id });
      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      const message = `Welcome to Shoe Haven ${user.firstname}, please follow the link to verify your email: ${url}`;
      await main(user.email, 'Email Verification', message);

      return res.status(201).send({ message: 'A verification link was sent to your email, please click on the link to verify your email' });
      }else{
      const newToken = new Token({
        userId: user._id,
        token: randomToken()
      })
      await newToken.save()
      const token = await Token.findOne({ userId: user._id });
      console.log(token)
      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      const message = `Welcome to Shoe Haven ${user.firstname}, please follow the link to verify your email: ${url}`;
      await main(user.email, 'Email Verification', message);

      return res.status(201).send({ message: 'A verification link was sent to your email, please click on the link to verify your email' });
     }
   }
    return res.status(404).send({ message: "User already verified" });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.post('/signin-with-google', async (req, res) => {
  const { given_name, family_name, email} = req.body;

  try {
      let user = await User.findOne({ email: email });

      if (user) {
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
        req.session.token = token;
    
  
         
          return res.status(200).send({ message: 'access granted', email: user.email});
      }

    
        const givenName = given_name.charAt(0).toUpperCase() + given_name.slice(1)
        const familyName = family_name.charAt(0).toUpperCase() + family_name.slice(1)
       user = new User({
          firstname: givenName,
          lastname: familyName,
          email: email.toLowerCase(),
          verified: true
      });

      await user.save();
      
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
      req.session.token = token;

      return res.status(201).send('User created');
  } catch (error) {
      console.error('Error signing in with Google:', error);
      return res.status(500).send('Internal Server Error');
  }
});

router.get('/verify-user-login', authenticateToken, (req,res)=>{
   return res.status(200).send({'message': 'user is signed in'})
})

router.post('/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.password) {
      return res.status(404).send({ message: 'Invalid Credentials' });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(404).send({ message: 'Invalid Credentials' });
    }

    if (!user.verified) {
      return res.status(206).send({ message: 'User not verified yet' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    req.session.token = token;

    console.log('Session:', req.session);
    console.log('Cookies:', req.cookies);

    res.setHeader('Access-Control-Allow-Origin', 'https://shoe-haven.vercel.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Log the session details to see if the cookie is being set properly
    res.on('finish', () => {
      console.log('Response Headers:', res.getHeaders());
    });

    return res.send({ message: 'Sign-in successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});




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
      return res.status(400).send({ message: 'Oops, invalid link! Token not found' });
    }
    
    await User.updateOne({ _id: user._id }, { $set: { verified: true } });
    await Token.deleteOne({ _id: token._id });

    return res.status(200).send({ message: 'Email verified successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});
router.get('/user-profile',authenticateToken,  async(req,res)=>{
  try{

  const {userId} = req.user
  const user = await User.findOne({_id: userId})

   return res.status(200).send(user)
  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})
router.post('/editprofile-info',authenticateToken,  async(req,res)=>{
  try{

  const {userId} = req.user
  const {firstname, lastname, phone} = req.body
  let fieldsToBeUpdated;
 const phoneNumber = phone.trim()
  if(phoneNumber){
  fieldsToBeUpdated = {
    $set: {
      firstname,
      lastname,
      phone: phoneNumber
    }
  }
}else{
  fieldsToBeUpdated = {
    $set: {
      firstname,
      lastname,
    }
  }
}

  await User.updateOne({_id: userId}, fieldsToBeUpdated)

   return res.status(200).send({messgae: 'User profile successfully updated'})
  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})
router.get('/fetchusernames', authenticateToken, async(req, res)=>{
  try{
    const {userId} = req.user

    const user = await User.findOne({_id: userId})
    .select('firstname lastname')
    
  if(!user){
    return res.status(404).send({'message': 'User not found'})
  }
  
  return res.status(200).send(user)
  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server error')
  }

})

router.post('/newaddress', authenticateToken, async(req,res)=>{
  try{
    const {userId} = req.user
    const {country, state, city, street, houseno, zipcode, phone} = req.body
  const user = await User.findById({_id: userId})
  if(!user){
    return res.status(404).send({'message': 'User not found'})
  }
    const newAddress = {
      country,
      state,
      city,
      street,
      houseno,
      zipcode,
      phone
    }
    user.addresses.push(newAddress);
    await user.save();
    return res.status(200).send({'messgae': 'New address added'})

  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})

router.get('/useraddress', authenticateToken, async(req,res)=>{
  try{
    const {userId} = req.user
   
  const user = await User.findById({_id: userId})
  .select('addresses firstname lastname email')
  if(!user){
    return res.status(404).send({'message': 'User not found'})
  }
   
    return res.status(200).send(user)

  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})

router.post('/deleteaddress', authenticateToken, async(req,res)=>{
  try{
    const {userId} = req.user
    const {addressId} = req.query
   
  let user = await User.findById({_id: userId})
  if(!user){
    return res.status(404).send({'message': 'User not found'})
  }
   
  await User.updateOne(
    { _id: userId },
    { $pull: { addresses: { _id: addressId } } }
  )
    user = await User.findById({_id: userId})
    return res.status(200).send(user)

  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})

router.post('/editaddress', authenticateToken, async(req,res)=>{
  try{
    const {userId} = req.user
    const {addressId} = req.query
    const {country, state, city, street, houseno, zipcode, phone} = req.body
   
  let user = await User.findById({_id: userId})
  if(!user){
    return res.status(404).send({'message': 'User not found'})
  }
   
  await User.updateOne(
    { _id: userId, 'addresses._id': addressId },
    {
      $set: {
        'addresses.$.street': street,
        'addresses.$.city': city,
        'addresses.$.state': state,
        'addresses.$.zipcode': zipcode,
        'addresses.$.country': country,
        'addresses.$.houseno': houseno,
        'addresses.$.phone': phone,
      }
    }
  );
    return res.status(200).send({'message': 'USer successfully updated'})

  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})


router.get('/fetchadrress', authenticateToken, async(req,res)=>{
  try{
    const {userId} = req.user
    const {addressId} = req.query
   
  let user = await User.findById({_id: userId})
  if(!user){
    return res.status(404).send({'message': 'User not found'})
  }
   const address = user.addresses.id(addressId)


    return res.status(200).send({address, user:{firstname: user.firstname, lastname: user.lastname}} )

  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})

router.post('/changepassword', authenticateToken, async(req,res)=>{
  try{
    const {userId} = req.user
    const {currentPassword, newPassword} = req.body
    

    const user = await User.findById({_id: userId})
    const isPassword = await bcrypt.compare(currentPassword, user.password)
    if(!isPassword){
      return res.status(404).send({message: "Invalid Credentials"})
    }
    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    await User.updateOne({_id: userId}, {$set: {password: hashedPassword}})

    return res.status(200).send({'message': 'password successfully changed'} )

  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})


router.post('/setpassword', authenticateToken, async(req,res)=>{
  try{
    const {userId} = req.user
    const {newPassword} = req.body
   
    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    await User.updateOne({_id: userId}, {$set: {password: hashedPassword}})

    return res.status(200).send({'message': 'password successfully set'} )

  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})

router.get('/passwordcheck', authenticateToken, async(req,res)=>{
  try{
    const {userId} = req.user
    

    const user = await User.findById({_id: userId})
    const hasPassword = user.password
    if(!hasPassword){
      return res.status(200).send({message: "No password"})
    }
  
    return res.status(200).send({message: 'password available'} )

  }catch(error){
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
})


router.get('/fetch-comments', async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({ message: 'ProductId is required' });
    }

    const comments = await Comment.find({ item: productId }).populate('user', 'firstname lastname profilePicture');
    
    return res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
})

router.get('/order-list', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;

    const userOrders = await Order.find({userId: userId}).sort({createdAt: -1})
    
    return res.status(200).send(userOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
})

router.get('/is-verified-buyer', authenticateToken, async (req, res) => {
  
  try {
    const { userId } = req.user;

    const user = await Order.find({userId: userId})

    if(!user.length>0){
      return res.status(404).send({message: "Not a verified buyer"})
    }
    return res.status(200).send({message: "Verified buyer"});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
})

router.post('/addreview', authenticateToken, async(req,res)=>{
 try{
   const {userId} =req.user
  const {comment, rating, itemId} =req.body
  const createComment = await new Comment({user: userId, item: itemId, text: comment, rating})
    await createComment.save() 
    await Newitems.findByIdAndUpdate(itemId, { $push: { comments: createComment._id } })
    await User.findByIdAndUpdate(userId, { $push: { comments: createComment._id } })
    return res.status(201).send({'message': 'Comment created'})
 }catch(error){
  console.log(error)
  return res.status(500).send('Internal Server Error')
 }
})

router.post('/delete-comment', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user; 
    const { commentId } = req.query;

    const comment = await Comment.findById(commentId);

    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

   
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to delete this comment' });
    }

   
    await Newitems.findByIdAndUpdate(comment.item, {
      $pull: { comments: commentId },
    });

  
    await User.findByIdAndUpdate(userId, {
      $pull: { comments: commentId },
    });

   
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/online', authenticateToken,(req,res)=>{
  return res.status(200).send({message: 'you are logged in', user: req.user.userId})
})
router.get('/validate-coupon',(req,res)=>{
  const {code}= req.query
  if(code === 'WIT21S' || code === 'DWITS' ){
    return res.status(200).send({message: 'Coupon code has expired', result: 'expired'})
  }
 if(code === 'DSS432' || code === 'DAUNTLESS' || code === 'DP25L'){
  return res.status(200).send({message: 'You\'ve won a discount of 10% OFF the total price', result: 'success'})
 }

  return res.status(200).send({message: 'Invalid coupon code', result: 'invalid'})
})


router.post('/create-checkout-session', authenticateToken, async (req, res) => {
  const {cart} = req.body
  const {userId} = req.user
 const {couponCode} = req.body
 const discounts= []

 const validCoupons = {
  'DAUNTLESS': 'iy3p4HUU',
  'DSS432': 'cwJAySHf',
  'DP25L': '4pLmX5Oi',
};
if (validCoupons[couponCode]) {
  discounts.push({
    coupon: validCoupons[couponCode],
  });
}

const newCart = new Cart({
  userId,
  items: cart
});

const randomNum = crypto.randomInt(0, 1000000)
const orderId = randomNum.toString().padStart(6, '0')
const savedCart = await newCart.save();

const customer = await stripe.customers.create({
  metadata: {
    userId,
    cartId: savedCart._id.toString(),
    orderId,
    coupon: couponCode,
  }
})  

  const line_items = cart.map((item, i)=>{
    return {
      price_data: {
        currency: 'usd',
          product_data: {
            name: item.brand,
            images: [item.imgurl]
          },
          unit_amount: item.discountprice * 100,
      },
      quantity: item.selected,
    }
  })

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'NG'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1000,
            currency: 'usd',
          },
          display_name: 'Second day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 2,
            },
            maximum: {
              unit: 'business_day',
              value: 2,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    discounts,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cart',
  });

  return res.send({url: session.url})
})

const endpointSecret = process.env.END_POINT_SECRET;

router.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  
  console.log('webhook verified')
} catch (err) {
  console.log(`Webhook Error: ${err.message}`)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const customer = await stripe.customers.retrieve(session.customer);
    const cartId = customer.metadata.cartId;

    
    const cart = await Cart.findById(cartId);

    const order = new Order({
      userId: customer.metadata.userId,
      orderId: customer.metadata.orderId,
      coupon: customer.metadata.coupon,
      sessionId: session.id,
      paymentMethodTypes: session.payment_method_types,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      amountSubtotal: session.amount_subtotal,
      currency: session.currency,
      shipping: session.shipping_details,
      totalDetails: session.total_details,
      customerDetails: session.customer_details,
      cart: cart.items 
    })
    

    try {
      await order.save();
    } catch (error) {
      console.log('Error saving order:', error);
    }
    
  await Cart.deleteOne({ userId: cart.userId})
  }

  response.send().end();
});


router.post('/create-checkout-cod', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user; 
    const {cart, amountTotal, totalDetails, amountSubtotal, customerDetails, couponCode} = req.body

    const randomNum = crypto.randomInt(0, 1000000)
    const orderId = randomNum.toString().padStart(6, '0')
    
    const order = new Order({
      userId,
      orderId,
      coupon: couponCode,
      paymentMethodTypes: ['Cash on Delivery'],
      paymentStatus: 'paid',
      amountTotal,
      amountSubtotal,
      totalDetails,
      customerDetails,
      cart 
    })
    try {
      await order.save();
    } catch (error) {
      console.log('Error saving order:', error);
    }
    return res.status(200).send({ url: '/success' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.post('/reset-link', async(req,res)=>{
  try{
 const {email} = req.body
 const user = await User.findOne({email: email})
 if(!user){
  return res.status(404).send({message: 'User not found'})
 }
 const resetEmail = await ResetToken.findOne({email: email})
  if(resetEmail){
    await ResetToken.deleteOne({email: email})
  }
 const newToken = await new ResetToken({
  token: randomToken(),
  email: email,
 })
 await newToken.save()

 const url = `${process.env.BASE_URL}users/${user._id}/${user.email}/reset-link/${newToken.token}`;
    const message = `Dear ${user.firstname}, please follow the link to reset your password: ${url}`;
    await main(user.email, 'Reset Password', message);
 return res.status(200).send({message: "Reset link sent!"})
  }catch(error){
    console.log(error)
    return res.status(500).send({message: 'Internal Server Error'})
  }

})

router.post('/reset-link-change-password', async(req,res)=>{
  try{
 
 const {email, token, id, password} = req.body

 const verifyToken = await ResetToken.findOne({token: token})
 if(!verifyToken){
  return res.status(404).send({message: 'Reset linke expired'})
 }
 const user = await User.findOne({email: email})
  if(!user){
   return res.status(404).send({message: 'User not found'})
  }
  const salt = bcrypt.genSaltSync(Number(process.env.SALT));
  const hashedPassword = bcrypt.hashSync(password, salt);

  await User.updateOne({_id: id}, {$set: {password: hashedPassword}})
  
  await ResetToken.deleteOne({email: email})

  return res.status(200).send({'message': 'Password successfully reset'} )
  }catch(error){
    console.log(error)
    return res.status(500).send({message: 'Internal Server Error'})
  }

})



router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    res.clearCookie('connect.sid');
    return res.status(200).send({ message: 'Logout successful' });
  });
});




module.exports = router;

