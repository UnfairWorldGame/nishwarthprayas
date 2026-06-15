const express = require("express");
const crypto = require("crypto");
const router = express.Router();

let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    const Razorpay = require("razorpay");
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } catch (err) {
    console.warn("Razorpay module not installed — online donations disabled.");
  }
}

router.post("/create-order", async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({
      message: "Online payment is not configured. Use UPI or WhatsApp.",
    });
  }

  const { amount, cause, name, email, phone } = req.body;

  if (!amount || amount < 10) {
    return res.status(400).json({ message: "Minimum donation amount is ₹10." });
  }

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `donate_${Date.now()}`,
      notes: {
        cause: cause || "general",
        donor_name: name || "",
        donor_email: email || "",
        donor_phone: phone || "",
      },
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    res.status(500).json({ message: "Could not create payment order." });
  }
});

router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: "Missing payment details." });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expected === razorpay_signature) {
    return res.json({ success: true });
  }

  return res.status(400).json({ success: false, message: "Payment verification failed." });
});

module.exports = router;
