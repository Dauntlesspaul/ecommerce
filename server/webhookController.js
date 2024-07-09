require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEYS);
const Cart = require('./model/Cart');
const Order = require('./model/Order');
const endpointSecret = process.env.END_POINT_SECRET;

exports.handleWebhook = async (req, res) => {
    console.log('paulo')
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('Webhook verified');
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
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
    });

    try {
      await order.save();
    } catch (error) {
      console.log('Error saving order:', error);
    }

    await Cart.deleteOne({ userId: cart.userId });
  }

  res.send().end();
};
