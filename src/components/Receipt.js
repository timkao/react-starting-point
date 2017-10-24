import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { checkOut, getCurrentOrder } from '../store';
import ProductItem from './ProductItem';
import axios from 'axios'

class Receipt extends Component {
  constructor(props) {
    super(props)
  }

  render(){
		return (
			<div>
        <h3>Thank you for your order !</h3>        
      </div>
		)
	}
}
const mapStateToProps = (state, ownProps = {}) => {
  return  {currentOrder: state.currentOrder}
}
const mapDispatchToProps = { getCurrentOrder }

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)

