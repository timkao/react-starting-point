import React from 'react'
import { connect } from 'react-redux'
import { updateOrderQuantity, removeItemFromOrder, saveToList } from '../store'

function ProductItem(props) {

  const { item } = props

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-lg-2"><img src={item.product.pictureUrl} /></div>
        <div className="col-lg-5">
          {item.product.name}<br></br>
          color: {item.color}<br></br>
          Size: {item.size}<br></br>
          <span>In Stock</span><br></br>
          <div className="row">
            <div className="col-lg-4 cart-action" onClick={props.removeItemList}><a>Remove from Cart</a></div>
            <div className="col-lg-4 cart-action" onClick={props.moveToSaveList}><a>Saved for later</a></div>
          </div>
        </div>
        <div className="col-lg-3">$ {item.product.price}</div>
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
      const thunk = updateOrderQuantity(orderId, id, evt.target.value)
      dispatch(thunk)
    },
    removeItemList() {
      const thunk = removeItemFromOrder(id, orderId)
      dispatch(thunk)
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
