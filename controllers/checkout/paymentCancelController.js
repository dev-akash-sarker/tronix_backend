const paymentCancelController = async (req, res) => {
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
          "payment.status": "canceled",
        },
      }
    );

    return res.redirect(`${process.env.FRONTEND_URL}/cart/checkout/canceled`);
  } catch (error) {
    console.error("Payment cancel error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/cart/checkout/fail`);
  }
};

module.exports = paymentCancelController;