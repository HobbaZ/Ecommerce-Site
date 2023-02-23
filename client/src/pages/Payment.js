import React from "react";
import Auth from "../utils/auth";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("");

const Payment = (props) => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  const YOUR_DOMAIN = "http://localhost:3000";

  const [formInput, setFormInput] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {
        const { id } = paymentMethod;
        try {
          const response = await fetch("/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          const session = await response.json();
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          if (result.error) {
            throw new Error(result.error.message);
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (err) {
      res.status(400).json({ message: "Error with payment" });
    }

    return (
      <Elements stripe={stripePromise} options={options}>
        <form>
          <PaymentElement />
          <button>Submit</button>
        </form>
      </Elements>
    );
  };
};
export default Payment;
