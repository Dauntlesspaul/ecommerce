const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    houseno: { type: String, required: true },
    phone: { type: String, required: true },
  })

const userSchema = new Schema({
    firstname : {
        type:String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String
    },
    addresses: [addressSchema],
    verified:{
        type:Boolean,
        default:false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('User', userSchema)