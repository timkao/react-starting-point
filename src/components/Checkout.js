import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { checkOut } from '../store'


class CheckOut extends Component {
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
    	paymentType: '',
      status: ''
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }
	onSubmitHandler(ev) {
    ev.preventDefault()
    
  }
  render(){

		return (
			<div>
				<form className="col-lg-8" onSubmit={ onSubmitHandler } >
					<div>
	        	<hr />
	        	Billing Information
	        	<hr />
	        </div>
					<div>
	        	<label>Name:</label>
	        	<div><input name="name" type="text" value="" /></div>
	        </div>
	        <div>
		        <label>Email:</label>
		        <div><input name="email" type="text" value="" /></div>
	        </div>
	        <div>
	        	<label>Payment Type:</label>
	        	<div><input name="paymentType" type="radio" value="CreditCard" />Credit Card Number</div>
	        	<div><input name="paymentType" type="radio" value="PayPal" />PayPal</div>
	        </div>
	        <div>
		        <label>Billing Address1:</label>
		        <div><input name="billingAddress1" type="text" value="" /></div>
	        </div>       
	        <div>
		        <label>Billing Address2:</label>
		        <div><input name="billingAddress2" type="text" value="" /></div>
	        </div>
	        <div>
		        <label>Billing City:</label>
		        <div><input name="billingCity" type="text" value="" /></div>
	        </div>
	        <div>
	        	<label>Billing State:</label>
	        	<div><input name="billingState" type="text" value="" /></div>
	        </div>
	        <div>
		        <label>Billing Zip:</label>
		        <div><input type="text" name="billingZip" value="" /></div>
	        </div>
	        
	        <div>
	        	<hr />
	        	Shipping Information
	        	<hr />
	        </div>
	        
	        <div>
		        <label>Shipping Address1:</label>
		        <div><input type="text" name="shippingAddress1" value="" /></div>
	        </div>
	        <div>
	       		<label>Shipping Address2:</label>
	        	<div><input type="text" name="shippingAddress2" value="" /></div>
	        </div>
	        <div>
		        <label>Shipping City:</label>
		        <div><input type="text" name="shippingCity" value="" /></div>
	        </div>
	        <div>
		        <label>Shipping State:</label>
		        <div><input type="text" name="shippingState" value="" /></div>
	        </div>
	        <div>
		        <label>Shipping Zip:</label>
		        <div><input type="text" name="shippingZip" value="" /></div>
	        </div>
	        <div>
		        <button type="submit" name="submitOrder">Save</button>
	        </div>
		    </form>
		  </div>
		)
	}
}
export default Checkout