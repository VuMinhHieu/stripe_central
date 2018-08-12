import React, { Component } from 'react';

export default class PaymentComponent extends Component {
  state={
    loading: true,
    charges: null
  };
  async componentDidMount(){
    let reponse = await fetch("/charges", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: 10
    }).then((reponse) => reponse.json());
    this.setState({
      charges: reponse.charges.data,
      loading: false
    })
  }

  render() {
    let chargesTable;
    if ( this.state.loading ) {
      chargesTable = <tr><td colSpan="4">loading...</td></tr>;
    } else if(this.state.charges) {
      chargesTable = this.state.charges.map(charge=>
        <tr key={charge.created}>
          <td>{charge.id}</td>
          <td>&#36;{(charge.amount/100).toFixed(2)}</td>
          <td>{`${charge.refunded}`}</td>
          <td>{charge.dispute}</td>
        </tr>
      )
    }
    return (
      <table className="blueTable">
        <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Refunded</th>
          <th>Dispute</th>
        </tr>
        </thead>

        <tbody>
        {chargesTable}
        </tbody>
      </table>
    );
  }
}