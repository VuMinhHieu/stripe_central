import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  focusCardElement(i) {
    if (i) {
      i._element.on("ready", () => {
        i._element.focus()
      })
    }
  }

  render() {
    return (
      <label>
        Card Number:
        <CardElement
          ref={(i) => {
          this.focusCardElement(i)
          }}
          onChange={this.props.handleChangeCard}
        />
      </label>
    );
  }
}

export default CardSection;