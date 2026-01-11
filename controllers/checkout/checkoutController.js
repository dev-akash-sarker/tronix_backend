// controllers/checkoutController.js
const OrderCheckout = require("../../model/orderModel");
const productModel = require("../../model/productModel");

const { ObjectId } = require("mongodb");
const { generateUniqueCustomOrderId } = require("../../util/orderIdGenerator"); // ⭐ IMPORT THE GENERATOR
// @ts-ignore
const SSLCommerzPayment = require("sslcommerz-lts");
const orderModel = require("../../model/orderModel");

const checkoutController = async (req, res) => {
  try {
    const { buyer, order, payment } = req.body;

    const store_id = process.env.STORE_ID;
    const store_passwd = process.env.STORE_PASSWD;
    const is_live = false; //true for live, false for sandbox

    // --- 1. Basic Validation ---
    if (
      !buyer ||
      !order ||
      !payment ||
      !order.items ||
      order.items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: buyer, order details, or items.",
      });
    }

    // --- 2. Data Mapping & Parsing ---
    const items = order.items.map((item) => ({
      productId: item.productId,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      thumbnail: item.thumbnail || "", // Ensure thumbnail is included if available
    }));

    console.log(items.productId);

    const subtotal = parseFloat(order.subtotal);
    const shipping = parseFloat(order.shipping) || 0;
    const tax = parseFloat(order.tax) || 0;
    const total = parseFloat(order.total);

    if (isNaN(subtotal) || isNaN(shipping) || isNaN(tax) || isNaN(total)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid numeric values for subtotal, shipping, tax, or total.",
      });
    }

    // --- 3. Generate Custom Order ID ---
    const customOrderID = await generateUniqueCustomOrderId(OrderCheckout); // ⭐ GENERATE ID HERE
    const tranx_id = new ObjectId().toString();
    // --- 4. Create Order Object ---
    const newOrder = new OrderCheckout({
      OrderId: customOrderID, // ⭐ ASSIGN THE CUSTOM ID
      tran_id: tranx_id,
      buyer: {
        firstName: buyer.firstName,
        lastName: buyer.lastName,
        email: buyer.email.toLowerCase(),
        contact: buyer.contact,
        address: buyer.address,
        city: buyer.city,
        country: buyer.country,
        zipCode: buyer.zipCode,
        note: buyer.note || "",
      },
      items,
      subtotal,
      shipping,
      tax,
      total,
      payment: {
        method: payment.method,
        status: payment.status || "pending",
      },
      status: "pending",
      paidStatus: false,
    });

    const product = await productModel.findOne({
      _id: items.map((item) => item.productId),
    });

    console.log("product", product.price);

    // --- 5. Conditional Saving & Response ---
    if (newOrder.payment.method === "Cash on delivery") {
      await newOrder.save();

      return res.status(201).json({
        success: true,
        message: "Order placed successfully (Cash on Delivery).",
        orderID: customOrderID, // ⭐ RETURN THE CUSTOM ID
      });
    } else if (newOrder.payment.method === "SSLCOMMERZE") {
      const data = {
        total_amount: product.price,
        currency: "BDT",
        tran_id: tranx_id, // use unique tran_id for each api call
        success_url: `${process.env.BASE_URL}/api/v1/checkout/success/${tranx_id}`,
        fail_url: `${process.env.BASE_URL}/api/v1/checkout/fail/${tranx_id}`,
        cancel_url: `${process.env.BASE_URL}/api/v1/checkout/cancel/${tranx_id}`,
        ipn_url: `${process.env.BASE_URL}/api/v1/checkout/ipn/${tranx_id}`,
        shipping_method: "Courier",
        product_name: product.title,
        product_category: product.categoryname,
        product_profile: "general",
        cus_name: buyer.firstName + " " + buyer.lastName,
        cus_email: buyer.email,
        cus_add1: buyer.address,
        cus_add2: "Dhaka",
        cus_city: buyer.city,
        cus_state: "Dhaka",
        cus_postcode: buyer.zipCode,
        cus_country: buyer.country,
        cus_phone: buyer.contact,
        cus_fax: "01711111111",
        ship_name: buyer.firstName + " " + buyer.lastName,
        ship_add1: buyer.address,
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: buyer.zipCode,
        ship_country: buyer.country,
      };
      console.log("hello world sslcomerze");
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;

        // res.send({ url: apiResponse.GatewayPageURL });
        // console.log("Redirecting to: ", GatewayPageURL);
        return res.status(200).json({
          success: true,
          url: apiResponse.GatewayPageURL,
        });
      });

      // const finalOrder = {
      //     product: product,
      //     tran_id: tranx_id,
      //     paidStatus: false,
      // }

      // const result = await orderModel.insertOne(finalOrder)

      // Save order temporarily before external payment
      await newOrder.save();

      // TODO: Implement SSLCommerz API integration and redirection logic here
      //  return res.status(201).json({
      //   success: true,
      //   message: "Order placed successfully with SSLCommerz.",
      //   orderID: customOrderID, // ⭐ RETURN THE CUSTOM ID
      // });

      // Example:
      // const redirectUrl = await initiateSSLCommerz(newOrder);

      //   return res.status(202).json({
      //     success: true,
      //     message: "Order initiated. Proceed to payment gateway.",
      //     orderID: customOrderID, // ⭐ RETURN THE CUSTOM ID
      //     // redirectUrl: redirectUrl,
      //   });
    } else {
      // Handle any other unsupported payment methods
      return res.status(400).json({
        success: false,
        message: `Unsupported payment method: ${newOrder.payment.method}`,
      });
    }
  } catch (error) {
    // --- 6. Robust Error Handling ---
    console.error("Checkout error:", error.message, error.stack);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        details: validationErrors,
      });
    }
    // Handle custom ID generation failure (e.g., if max attempts were reached)
    if (error.message.includes("Failed to generate a unique custom Order ID")) {
      return res.status(500).json({
        success: false,
        message:
          "System error: Could not generate a unique Order ID. Please try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during checkout",
      details: error.message,
    });
  }
};

module.exports = checkoutController;
