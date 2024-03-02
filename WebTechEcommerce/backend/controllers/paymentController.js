import { instance } from "../index.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../models/paymentModels.js";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount) * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  try {
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
    var razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      image: 'https://i.imgur.com/n5tjHFD.jpg',
    });
    razorpay.once('ready', function(response) {
      console.log(response.methods);
    })
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message, // Send error message back to client
    });
  }
};
export const paymentverification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {

      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
    } 
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
    });
  }
};
