// ./src/api/payment/services/payment.js
const Razorpay = require('razorpay');

module.exports = {
  async createOrder(amount, currency) {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency,
    });

    return order;
  },
};