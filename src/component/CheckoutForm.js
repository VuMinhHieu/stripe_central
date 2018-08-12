import React from 'react';
import {injectStripe} from 'react-stripe-elements';

import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      amount: '',
      note: null,
      name: '',
      complete: false,
      message:''
    });
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeCard = this.handleChangeCard.bind(this);
  }

  async handleSubmit(ev) {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    if ( !this.state.amount ) {
      this.setState({
        message : 'Please input amount'
      });
    }
    else if (this.state.complete && this.state.amount) {
      this.setState({
        message : 'Create Token....'
      });
      let {token} = await this.props.stripe.createToken({name: this.state.name || 'Pious'});
      this.setState({
        message : 'Create charge....'
      });
      try {
        let response = await fetch("/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: JSON.stringify({
            source: token.id,
            amount: this.state.amount *100,
            description: this.state.note,
          })
        });
        console.log(response);
        if (response.ok){
          let responseJson = await response.json();
          if (responseJson.charge.status==="succeeded") {
              this.setState({
                message : 'Purchase Complete! ID: ' + responseJson.charge.id
              });
            }
        } else {
          this.setState({
            message : 'Purchase error. Code: ' + response.status + " - " + response.statusText
          });
        }
      } catch (error) {
        console.error(error);
        this.setState({
          message : 'Purchase error reason unknow.'
        });
      }
    }
  };

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangeAmount(event) {
    const amount = (event.target.validity.valid) ? event.target.value : this.state.amount;
    this.setState({amount});
  }
  handleChangeCard(value){
    const {complete, error} = value;
    if (complete){
      this.refs["Name"].focus();
    }
    let message = '';
    if ( error ) {
      message = error.message;
    }
    this.setState({
      message,
      complete,
    });

  }
  handleKeyPress(value, event){
    if ( value === "Name" ){
      if ( event.key === 'Enter' )
        this.refs["Amount"].focus();
    }
  }
  render() {
    return (
        <form className="charge-form" onSubmit={(ev)=>this.handleSubmit(ev)}>
          <p>Make a charge!</p>
          <CardSection
            handleChangeCard={this.handleChangeCard}
          />
          <br/>
          <label>
            Name:
            <br/>
            <input
              ref = 'Name'
              placeholder="Name"
              type="text"
              value={this.state.name}
              onChange={this.handleChangeName}
              onKeyPress={(event) => this.handleKeyPress('Name', event)}
            />
          </label>
          <br/>
          <label>
            Amount:
            <br/>
            <input
              ref = 'Amount'
              placeholder="Amount"
              type="text"
              pattern="[0-9]*"
              value={this.state.amount}
              onChange={this.handleChangeAmount}
            />.00
          </label>
          <br/>
          <button>Confirm order</button>
          <p>{this.state.message}</p>
        </form>
    );
  }
}

export default injectStripe(CheckoutForm);