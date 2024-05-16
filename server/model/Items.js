const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewitemsSchema = new Schema({
imageurl:{
    type: String,
    required:true
},
brand: {
   type: String,
   required: true
},
units: {
    type: Number,
    required: true
 },
price: {
    type: Number,
    required: true
 },
discountprice: {
    type: Number,
    required: true
 },
category:{
    type:String,
    required:true
},
section:{
    type:String,
    required:true
},
rating: {
    type: String,
    required: true
 },
 description: {
    type: String,
    required: true
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
NewitemsSchema.index({ createdAt: 1 });
module.exports = mongoose.model("Newitems",NewitemsSchema);