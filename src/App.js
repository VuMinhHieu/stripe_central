import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {StripeProvider} from 'react-stripe-elements';
import {withStripe} from "./WithStripAPI"

import { TabList, Tab } from "./component/TabList";
import PaymentComponent from "./component/PaymentComponent";
import MyStoreCheckout from './component/MyStoreCheckout';

const HOCPaymentComponent = withStripe(PaymentComponent);
class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header App">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React<br/> Stripe Center</h1>
        </header>
        <TabList>
          <Tab name="charge">
            <StripeProvider apiKey={"pk_test_VBgVn9rgI2COHp6hWaeEyDnN"}>
              <MyStoreCheckout />
            </StripeProvider>
          </Tab>
          <Tab name="payment">
            <HOCPaymentComponent />
          </Tab>
        </TabList>
      </div>
    );
  }
}

export default App;
