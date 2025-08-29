import React from "react";

const PaymentButton = () => {
  const handlePayment = async () => {
    const response = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", amount: 5000 }), // ₦5000
    });

    const data = await response.json();

    if (data.status === true) {
      // Redirect to Paystack checkout page
      window.location.href = data.data.authorization_url;
    } else {
      alert("Payment failed to start: " + data.message);
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;
