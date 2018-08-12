import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';
import {withStripe} from "../WithStripAPI"

const HOCCCheckoutForm = withStripe(InjectedCheckoutForm);

class MyStoreCheckout extends React.Component {
  render() {
    return (
        <Elements>
          <HOCCCheckoutForm />
        </Elements>
    );
  }
}

export default MyStoreCheckout;