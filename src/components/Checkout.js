import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { checkOut } from '../store'
import axios from 'axios'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
    	name: '',
    	email: '',
    	billingAddress1: '',
    	billingAddress2: '',
    	billingCity: '',
    	billingState: '',
    	billingZip: '',
    	shippingAddress1: '',
    	shippingAddress2: '',
    	shippingCity: '',
    	shippingState: '',
    	shippingZip: '',
    	phoneNumber: '',
    	paymentType: '',
      status: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangeBillingAddress1 = this.handleChangeBillingAddress1.bind(this)
    this.handleChangeBillingAddress2 = this.handleChangeBillingAddress2.bind(this)
    this.handleChangeBillingCity = this.handleChangeBillingCity.bind(this)
    this.handleChangeBillingState = this.handleChangeBillingState.bind(this)
    this.handleChangeBillingZip = this.handleChangeBillingZip.bind(this)
    this.handleChangeShippingAddress1 = this.handleChangeShippingAddress1.bind(this)
    this.handleChangeShippingAddress2 = this.handleChangeShippingAddress2.bind(this)
    this.handleChangeShippingCity = this.handleChangeShippingCity.bind(this)
    this.handleChangeShippingState = this.handleChangeShippingState.bind(this)
    this.handleChangeShippingZip = this.handleChangeShippingZip.bind(this)
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this)
    this.handleChangePaymentType = this.handleChangePaymentType.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }
	handleSubmit(evt) {
    // ev.preventDefault();
   	console.log(this.state)
   	alert(this.state.name)
   	axios.post('/api/orders/',
			{
				phoneNumber: this.state.phoneNumber,
				shippingAddress1: this.state.shippingAddress1,
				shippingAddress2: this.state.shippingAddress2,
				shippingCity: this.state.shippingCity,
				shippingState: this.state.shippingState,
				shippingZip: this.state.shippingZip,
				billingAddress1: this.state.billingAddress1,
				billingAddress2: this.state.billingAddress2,
				billingCity: this.state.billingCity,
				billingState: this.state.billingState,
				billingZip: this.state.billingZip,
				paymentType: this.state.paymentType,
				status: this.state.status
			}
		)
  }
  handleChangeName(evt){this.setState({name: evt.target.value})}
  handleChangeEmail(evt){this.setState({email: evt.target.value})}
  handleChangeBillingAddress1(evt){this.setState({billingAddress1: evt.target.value})}
  handleChangeBillingAddress2(evt){this.setState({billingAddress2: evt.target.value})}
  handleChangeBillingCity(evt){this.setState({billingCity: evt.target.value})}
  handleChangeBillingState(evt){this.setState({billingState: evt.target.value})}
  handleChangeBillingZip(evt){this.setState({billingZip: evt.target.value})}
  handleChangeShippingAddress1(evt){this.setState({shippingAddress1: evt.target.value})}
  handleChangeShippingAddress2(evt){this.setState({shippingAddress2: evt.target.value})}
  handleChangeShippingCity(evt){this.setState({shippingCity: evt.target.value})}
  handleChangeShippingState(evt){this.setState({shippingState: evt.target.value})}
  handleChangeShippingZip(evt){this.setState({shippingZip: evt.target.value})}
  handleChangePhoneNumber(evt){this.setState({phoneNumber: evt.target.value})}
  handleChangePaymentType(evt){this.setState({paymentType: evt.target.value})}
  handleChangeStatus(evt){this.setState({status: evt.target.value})
}
  render(){

		return (
			<div>
				<form>
					<div>
	        	<hr />
	        	Billing Information
	        	<hr />
	        </div>
					<div>
	        	<label>Name:</label>
	        	<div><input name="name" type="text" onChange={this.handleChangeName} /></div>
	        </div>
	        <div>
		        <label>Email:</label>
		        <div><input name="email" type="text" onChange={this.handleChangeEmail} /></div>
	        </div>
	        <div>
	        	<label>Payment Type:</label>
	        	<div><input name="paymentType" type="radio" value="Credit Card" onChange={this.handleChangePaymentType}/>Credit Card</div>
	        	<div><input name="paymentType" type="radio" value="PayPal" onChange={this.handleChangePaymentType}/>PayPal</div>
	        </div>
	        <div>
	        	<label>Phone Number:</label>
	        	<div><input name="phoneNumber" type="text" onChange={this.handleChangePhoneNumber} /></div>
	        <div>
		        <label>Billing Address1:</label>
		        <div><input name="billingAddress1" type="text" onChange={this.handleChangeBillingAddress1} /></div>
	        </div>       
	        <div>
		        <label>Billing Address2:</label>
		        <div><input name="billingAddress2" type="text" onChange={this.handleChangeBillingAddress2} /></div>
	        </div>
	        <div>
		        <label>Billing City:</label>
		        <div><input name="billingCity" type="text" onChange={this.handleChangeBillingCity} /></div>
	        </div>
	        <div>
	        	<label>Billing State:</label>
	        	<div><input name="billingState" type="text" onChange={this.handleChangeBillingState} /></div>
	        </div>
	        <div>
		        <label>Billing Zip:</label>
		        <div><input type="text" name="billingZip" onChange={this.handleChangeBillingZip} /></div>
	        </div>
	        
	        <div>
	        	<hr />
	        	Shipping Information
	        	<hr />
	        </div>
	        
	        <div>
		        <label>Shipping Address1:</label>
		        <div><input type="text" name="shippingAddress1" onChange={this.handleChangeShippingAddress1}  /></div>
	        </div>
	        <div>
	       		<label>Shipping Address2:</label>
	        	<div><input type="text" name="shippingAddress2" onChange={this.handleChangeShippingAddress2}  /></div>
	        </div>
	        <div>
		        <label>Shipping City:</label>
		        <div><input type="text" name="shippingCity" onChange={this.handleChangeShippingCity}  /></div>
	        </div>
	        <div>
		        <label>Shipping State:</label>
		        <div><input type="text" name="shippingState" onChange={this.handleChangeShippingState}  /></div>
	        </div>
	        <div>
		        <label>Shipping Zip:</label>
		        <div><input type="text" name="shippingZip" onChange={this.handleChangeShippingZip}  /></div>
	        </div>
	        <div>
		        <button type="submit" name="submitOrder" onClick={ this.handleSubmit } >Save</button>
	        </div>
		    </form>
		    
		  </div>
		)
	}
}

export default Checkout