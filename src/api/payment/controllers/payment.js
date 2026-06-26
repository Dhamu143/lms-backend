"use strict";

const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = {
  async createOrder(ctx) {
    try {
      const { amount } = ctx.request.body;

      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

      ctx.send({
        success: true,
        key: process.env.RAZORPAY_KEY_ID,
        order,
      });
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },

  async verifyPayment(ctx) {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = ctx.request.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return ctx.badRequest("Invalid payment signature");
      }

      ctx.send({
        success: true,
        message: "Payment verified successfully",
      });
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
};