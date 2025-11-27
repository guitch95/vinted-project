import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useState} from 'react';
import axios from 'axios';

const CheckoutForm = ({total, title}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [completed, setCompleted] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // On commence à charger

    if (elements == null) {
      return;
    }

    const {error: submitError} = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    let response;
    try {
      response = await axios.post(
        'https://lereacteur-vinted-api.herokuapp.com/v2/payment',
        {
          amount: Math.round(total * 100),
          title: title,
        }
      );
    } catch (error) {
      error.response
        ? setErrorMessage(error.response.data.message)
        : setErrorMessage(error);
    }

    const clientSecret = response.data.client_secret;
    // envoyer une requête à stripounet pour débiter notre généreux client

    const stripeResponse = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:5173/',
      },
      redirect: 'if_required',
    });

    // Si une erreur a lieu pendant la confirmation
    if (stripeResponse.error) {
      // On la montre au client
      setErrorMessage(stripeResponse.error.message);
    }

    // Si on reçois un status succeeded on fais passer completed à true
    if (stripeResponse.paymentIntent.status === 'succeeded') {
      setCompleted(true);
    }
    // On a fini de charger
  };

  return completed ? (
    <p>Paiement effectué</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <p>{errorMessage}</p>}
      <button className="payment-btn" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
