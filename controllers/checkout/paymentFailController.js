
const paymentFailController = async (req, res) => {
  try {
    const tran_id = req.body.tran_id || req.params.transid;

    if (!tran_id) {
      return res.status(400).send("Invalid transaction ID");
    }

    await orderModel.updateOne(
      { tran_id },
      {
        $set: {
          paidStatus: false,
          "payment.status": "failed",
        },
      }
    );

    return res.redirect(`${process.env.FRONTEND_URL}/cart/checkout/fail`);
  } catch (error) {
    console.error("Payment fail error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/cart/checkout/fail`);
  }
};

module.exports = paymentFailController;