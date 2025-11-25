import React from 'react';
import {useLocation} from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP'
);

const Payment = () => {
  const location = useLocation();
  const {price, title} = location.state;

  const protection = 0.4;
  const shipping = 0.8;

  const total = price + protection + shipping;

  const options = {
    mode: 'payment',
    amount: Math.round(total * 100),
    currency: 'eur',
  };

  return (
    <div className="container-payment">
      <div className="card-payment">
        <div className="summary">
          <p>Résumé de la commande</p>
        </div>
        <div className="order">
          <p>Commande</p>
          <p>{price.toFixed(2)} €</p>
        </div>
        <div className="order">
          <p>Frais de protection acheteurs</p>
          <p>{protection.toFixed(2)} €</p>
        </div>
        <div className="order">
          <p>Frais de port</p>
          <p>{shipping.toFixed(2)} €</p>
        </div>
      </div>
      <div className="card-total">
        <div className="order">
          <p>Total</p>
          <p>{total.toFixed(2)}€</p>
        </div>
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir{' '}
          <span>{title}</span>. Vous allez payer{' '}
          <span>{total.toFixed(2)} €</span> (frais de protection et frais de
          port inclus).
        </p>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm total={total} title={title} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
