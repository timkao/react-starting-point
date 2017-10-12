import React from 'react'
import { connect } from 'react-redux'

function Checkout(props){
	return (
		<form className="col-lg-8">
        <label>
          Name: <input type="text" value=""  />
        </label>
        <br />
        <label>
          Billing Address1: <input type="text" value="" />
        </label>
        <br />
        <label>
          Billing Address2: <input type="text" value="" />
        </label>
        <br />
        <label>
          Billing City: <input type="text" value="" />
        </label>
        <br />
        <label>
          Billing State: <input type="text" value="" />
        </label>
        <br />
        <label>
          Billing Zip: <input type="text" value="" />
        </label>
        <br />
        <label>
          Shipping Address1: <input type="text" value="" />
        </label>
        <br />
        <label>
          Shipping Address2: <input type="text" value="" />
        </label>
        <br />
        <label>
          Shipping City: <input type="text" value="" />
        </label>
        <br />
        <label>
          Shipping State: <input type="text" value="" />
        </label>
        <br />
        <label>
          Shipping Zip: <input type="text" value="" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
	)
}

export default Checkout