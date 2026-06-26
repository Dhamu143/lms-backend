module.exports = {
  routes: [
    {
      method: "POST",
      path: "/payment/create-order",
      handler: "payment.createOrder",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/payment/verify-payment",
      handler: "payment.verifyPayment",
      config: {
        auth: false,
      },
    },
  ],
};