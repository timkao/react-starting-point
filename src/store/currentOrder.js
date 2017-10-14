import axios from 'axios'

const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER'

export const setCurrentOrder = (order) => {
  return {
    type: GET_CURRENT_ORDER,
    currentOrder: order
  }
}

export const getCurrentOrder = (id) => {
  return function(dispatch) {
    axios.get(`/api/orders/all/${id}`)
    .then( result => result.data)
    .then( order => {
      const action = setCurrentOrder(order)
      dispatch(action)
    })
  }
}

export const updateOrderQuantity = (orderId, itemId, quantity) => {
  return function(dispatch) {
    axios.put('/api/lineitems', {itemId, quantity})
    .then( () => {
      const thunk = getCurrentOrder(orderId)
      dispatch(thunk)
    })
  }
}

export const removeItemFromOrder = (itemId, orderId) => {
  return function(dispatch) {
    axios.delete(`/api/lineitems/${itemId}`)
    .then(() => {
      const thunk = getCurrentOrder(orderId)
      dispatch(thunk)
    })
  }
}

export const addItemToOrder = (orderId, productId, itemInfo) => {
  return function(dispatch) {
    axios.post(`/api/lineitems/${orderId}/${productId}`, itemInfo)
    .then(() => {
      const thunk = getCurrentOrder(orderId)
      dispatch(thunk)
    })
  }
}

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return action.currentOrder
    default:
      return state
  }
}

export default orderReducer
