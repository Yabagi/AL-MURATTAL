// pages/api/pay.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: false, message: "Method not allowed" });
  }

  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ status: false, message: "Email and amount are required" });
  }

  try {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: Bearer ${process.env.PAYSTACK_SECRET_KEY},
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Convert naira to kobo
        callback_url: "https://yourdomain.com/payment-success", // replace with your success URL
      }),
    });

    const data = await response.json();

    if (data.status) {
      return res.status(200).json({ status: true, data: data.data });
    } else {
      return res.status(500).json({ status: false, message: "Payment initialization failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
}
