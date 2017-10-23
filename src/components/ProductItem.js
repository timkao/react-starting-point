import React from 'react';
import { connect } from 'react-redux';
import { updateOrderQuantity, removeItemFromOrder, saveToList, setCurrentOrder } from '../store';
import { Link } from 'react-router-dom';


function ProductItem(props) {

  const { item } = props

  return (
    <li className="list-group-item">
      <div className="row">
        <Link to={`/product/${item.product.id}`}><div className="col-lg-3"><img src={item.product.pictureUrl} /></div></Link>
        <div className="col-lg-5">
          {item.product.name}<br></br>
          color: {item.color}<br></br>
          Size: {item.size}<br></br>
          <span>In Stock</span><br></br>
          <div className="row">
            <div className="col-lg-4 cart-action" onClick={props.removeItemList}><a>Remove from Cart</a></div>
            {
              props.currentOrder.id !== 'temp' &&
              <div className="col-lg-4 cart-action" onClick={props.moveToSaveList}><a>Saved for later</a></div>
            }
          </div>
        </div>
        <div className="col-lg-2">$ {item.product.price}</div>
        <div className="col-lg-2">
          <input name="quantity" className="pull-right cart-quantity" type="number" value={item.quantity} onChange={props.changeQuantity} />
        </div>
      </div>
    </li>

  )
}

const mapToState = (state) => {
  return {
    currentOrder: state.currentOrder,
  }
}

const mapToDispatch = (dispatch, ownProps) => {

  const { id, orderId, product } = ownProps.item

  return {
    changeQuantity(evt) {
      if (ownProps.order.id !== 'temp') {
        const thunk = updateOrderQuantity(orderId, id, evt.target.value)
        dispatch(thunk)
      }
      else {
        ownProps.order.lineitems.map( lineitem => {
          if (ownProps.item.product.id === lineitem.productId * 1) {
            lineitem.quantity = evt.target.value;
            return lineitem;
          }
          else {
            return lineitem;
          }
        })
        const updatedOrder = Object.assign({}, ownProps.order);
        dispatch(setCurrentOrder(updatedOrder));
      }
    },
    removeItemList() {
      if (ownProps.order.id !== 'temp') {
        const thunk = removeItemFromOrder(id, orderId)
        dispatch(thunk)
      }
      else {
        ownProps.order.lineitems = ownProps.order.lineitems.filter(lineitem => {
          return ownProps.item.product.id !== lineitem.productId * 1;
        })
        const updatedOrder = Object.assign({}, ownProps.order);
        dispatch(setCurrentOrder(updatedOrder));
      }
    },
    moveToSaveList() {
      const thunk = saveToList(product)
      dispatch(thunk)
      const thunk2 = removeItemFromOrder(id, orderId)
      dispatch(thunk2)
    }
  }
}

const productItemContainer = connect(mapToState, mapToDispatch)(ProductItem)

export default productItemContainer
