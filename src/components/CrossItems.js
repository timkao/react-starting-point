import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCrossPurchase, addItemToOrder } from '../store';
import { Link } from 'react-router-dom';


class CrossItems extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.pullList(this.props.id)
  }

  render() {
    let items = [];
    let format, id;
    if (this.props.id) {
      items = this.props.crossList;
      format = "col-lg-2";
      id = "crossList";
    }
    else {
      items = this.props.repeatList
      format = "col-lg-12";
      id = "historyList";
    }

    let key = 0;

    return (
      <div id={id} className="row">
        {
          items.map(item => {
            return (
              <div key={key++} className={format}>
                <Link to={`/product/${item.id}`}><img src={item.pictureUrl} /></Link><br></br>
                {item.name}<br></br>
                $ {item.price}<br></br>

                <span>Color: {item.color}<br></br></span>

                <span>Size: {item.size}<br></br></span>

                {
                  this.props.repeatList &&
                  <div className="cart-action" onClick={() => { this.props.addItemToCart(item) }}><a>Add to Cart</a></div>
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapToState = (state) => {
  return {
    crossList: state.crossList,
    currentOrder: state.currentOrder
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  return {
    pullList(productId) {
      if (productId) {
        const thunk = fetchCrossPurchase(productId)
        dispatch(thunk)
      }
    },
    addItemToCart(product) {
      const thunk = addItemToOrder(ownProps.orderId, product.id, {
        color: product.color,
        size: product.size
      });
      dispatch(thunk);
    }
  }
}

const crossItemsContainer = connect(mapToState, mapToDispatch)(CrossItems)

export default crossItemsContainer
