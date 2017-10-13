import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductsbyOrderId } from '../store'

class Cart extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllOrderProducts(this.props.match.params.orderId)
  }

  render() {

    const { products } = this.props

    return (
      <div className="row">
        <div className="col-lg-10">
          {
            products.map( product => {
              return (
                <li key={product.id}>{product.name}</li>
              )
            })
          }
          </div>
        <div className="col-lg-2">Summary and History</div>
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
    getAllOrderProducts(id) {
      const thunk = getProductsbyOrderId(id)
      dispatch(thunk)
    }
  }
}

const cartContainer = connect(mapToState, mapToDispatch)(Cart)

export default cartContainer
