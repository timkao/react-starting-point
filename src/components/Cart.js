import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentOrder, fetchSaveProducts, fetchCrossPurchase } from '../store';
import ProductItem from './ProductItem';
import SavedItem from './SavedItem'

class Cart extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getOrder(this.props.match.params.orderId)
    this.props.pullSavedProducts()
    this.props.pullCrossList(1)
  }

  render() {

    const items = this.props.currentOrder.lineitems || [];
    items.sort(function (a, b) {
      return a.id - b.id
    })
    const savedProducts = this.props.savedProducts || []
    const crossList = this.props.crossList || []
    console.log(crossList)

    return (
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-7">Shopping Cart</div>
            <div className="col-lg-3">Price</div>
            <div className="col-lg-2"><div className="pull-right">Quantity</div></div>
          </div>
          <div className="row">
            {
              <ul id="cartList" className="list-group">
                {
                  items.map(item => {
                    return (
                      <ProductItem key={item.id} item={item} />
                    )
                  })
                }
              </ul>
            }
          </div>
          <div className="row">
            <div className="col-lg-7">{`Saved for Later ( ${savedProducts.length} item(s) )`}</div>
            <div className="col-lg-3">Price</div>
          </div>
          <div className="row">
            {
              <ul id="savedList" className="list-group">
                {
                  savedProducts.map( product => {
                    return (
                      <SavedItem key={product.id} item={product} />
                    )
                  })
                }
              </ul>
            }
          </div>
          <div className="row">
            People Also Buy <br></br>
            {/* <ProductList products={products} /> */}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="row">Summary</div>
          <div className="row">History</div>
        </div>
      </div>
    )
  }
}

const mapToState = (state) => {
  return {
    currentOrder: state.currentOrder,
    savedProducts: state.savedProducts,
    crossList: state.crossList
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  return {
    getOrder(orderId) {
      const thunk = getCurrentOrder(orderId)
      dispatch(thunk)
    },
    pullSavedProducts() {
      const thunk = fetchSaveProducts()
      dispatch(thunk)
    },
    pullCrossList(productId) {
      if (productId) {
        const thunk = fetchCrossPurchase(productId)
        dispatch(thunk)
      }
    }
  }
}

const cartContainer = connect(mapToState, mapToDispatch)(Cart)

export default cartContainer
