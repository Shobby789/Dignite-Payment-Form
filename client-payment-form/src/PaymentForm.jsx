import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    }

    // Call backend to create the payment intent
    const response = await fetch(
      "http://localhost:2000/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000,
          currency: "usd",
          paymentMethodType: "card",
        }),
      }
    );
    const { clientSecret } = await response.json();

    // Confirm the card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setErrorMessage(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful");
      console.log("Payment successful");
    } else {
      console.log("3D Secure authentication needed");
    }

    setIsProcessing(false);
  };

  return (
    <div className="padding-x py-6 min-h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handlePayment}
        className="w-full lg:w-1/2 border rounded-xl px-16 py-20 mx-auto"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full border rounded-lg p-2.5 text-sm outline-none block"
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full border rounded-lg p-2.5 text-sm outline-none block"
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <input
            type="text"
            placeholder="Phone"
            className="w-full border rounded-lg p-2.5 text-sm outline-none block"
          />
          <input
            type="text"
            placeholder="$2000"
            className="w-full border rounded-lg p-2.5 text-sm outline-none block"
          />
        </div>
        <CardElement />
        {errorMessage && <div>{errorMessage}</div>}
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium mt-3.5"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
