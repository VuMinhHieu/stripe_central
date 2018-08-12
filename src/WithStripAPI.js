import React, {Component} from 'react';
export function withStripe(WrappedComponent){
  const request = async (route, requestData) => {
    return await fetch(`/${route}`, {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: requestData
    }).then((reponse) => reponse.json());
  };
  return class extends Component{
    requestCharge(route, requestData){
      return request(route, requestData);
    }
    render(){
      return <WrappedComponent
        requestCharge={this.requestCharge}
        {...this.props}
      />
    }
  }
}