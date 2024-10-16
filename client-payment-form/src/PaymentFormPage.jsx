import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51OyvorBEJbyBfiqfeh5m47kbjAqdhUzzkFRBNGwGMf4jHYyzlkgLmDCYsHOkP3YuAxbo9ZXJHGoBFwducz9ATi4x00rxKcBaIX"
);

function PaymentFormPage() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </>
  );
}

export default PaymentFormPage;
