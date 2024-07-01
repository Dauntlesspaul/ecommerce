const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: {type: String, required: true},
  coupon: {type: String},
  sessionId: { type: String},
  paymentStatus: { type: String, required: true },
  paymentMethodTypes: [{type: String, required: true}],
  deliveryStatus: { type: String, default: 'pending' },
  amountTotal: { type: Number, required: true },
  totalDetails: {type: Object, required: true},
  amountSubtotal: { type: Number, required: true },
  currency: { type: String,},
  shipping: {
    address: { type: Object},
    name: { type: String},
  },
  customerDetails: {
  address: {type: Object},
  email: {type: String},
  name: {type: String},
  phone: { type: mongoose.Schema.Types.Mixed }
  },
  cart: [{ type: Object, required: true }] 
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
