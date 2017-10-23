import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';
import { Link } from 'react-router-dom';
import BarChart from './BarChart';


class AdminP extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
      const priceData = [];
      const labelData = [];

      this.props.products.forEach( product => {
        priceData.push(product.price);
        labelData.push(product.name);
      })



    return (
      <div>
        {
          this.props.products.length && <BarChart data={priceData} labels={labelData} />
        }
      </div>

    )
  }
}

const mapToState = (state) => {
  return {
    products: state.products
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  return {
    getAllProducts() {
      const thunk = fetchProducts()
      dispatch(thunk);
    }
  }
}

const adminPContainer = connect(mapToState, mapToDispatch)(AdminP)

export default adminPContainer;

