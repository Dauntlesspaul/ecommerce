const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname : {
        type:String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    verified:{
        type:Boolean,
        default:false
    },
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