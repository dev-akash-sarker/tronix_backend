const orderModel = require("../../model/orderModel");

const paymentSuccessController = async (req, res) => {
  try {
    // SSLCommerz sends form-data, not JSON
    const tran_id = req.body.tran_id || req.params.transid;

    if (!tran_id) {
      return res.status(400).send("Invalid transaction ID");
    }

    const result = await orderModel.updateOne(
      { tran_id },
      { $set: { paidStatus: true , "payment.status": "paid",} }
    );

    // Always redirect with absolute URL
    return res.redirect(
      `${process.env.FRONTEND_URL}/cart/checkout/success/${tran_id}`
    );

  } catch (error) {
    console.error("Payment success error:", error);
    return res.redirect(
      `${process.env.FRONTEND_URL}/cart/checkout/fail`
    );
  }
};

module.exports = paymentSuccessController;
