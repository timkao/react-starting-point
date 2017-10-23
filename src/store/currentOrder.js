import axios from 'axios';

const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'
const tempOrder = {
  billingAddress1: null,
  billingAddress2: null,
  billingCity: null,
  billingState: null,
  billingZip: null,
  debitCreditCard: null,
  id: 'temp',
  lineitems: [],
  payPalData: null,
  paymentMethod: null,
  phoneNumber: null,
  shippingAddress1: null,
  shippingAddress2: null,
  shippingCity: null,
  shippingMethod: null,
  shippingState: null,
  status: 'Open',
  userId: null
};

export const setCurrentOrder = (order) => {
  return {
    type: SET_CURRENT_ORDER,
    currentOrder: order
  }
}

// export const getCurrentOrder = (id) => {
//   return function(dispatch) {
//     axios.get(`/api/orders/all/${id}`)
//     .then( result => result.data)
//     .then( order => {
//       const action = setCurrentOrder(order)
//       dispatch(action)
//     })
//   }
// }

export const getCurrentOrder = () => {
  return function (dispatch) {
    axios.get('/api/users/currentOrder')
      .then(result => result.data)
      .then(order => {
        if (order !== 'not member') {
          const action = setCurrentOrder(order)
          dispatch(action)
        }
        else {
          const action = setCurrentOrder(tempOrder);
          dispatch(action);
        }
      })
  }
}

export const updateOrderQuantity = (orderId, itemId, quantity) => {
  return function (dispatch) {
    axios.put('/api/lineitems', { itemId, quantity })
      .then(() => {
        const thunk = getCurrentOrder(orderId)
        dispatch(thunk)
      })
  }
}

export const removeItemFromOrder = (itemId, orderId) => {
  return function (dispatch) {
    axios.delete(`/api/lineitems/${itemId}`)
      .then(() => {
        const thunk = getCurrentOrder(orderId)
        dispatch(thunk)
      })
  }
}

export const addItemToOrder = (orderId, productId, itemInfo) => {
  return function (dispatch) {
    axios.post(`/api/lineitems/${orderId}/${productId}`, itemInfo)
      .then(result => {
        if (result.data.id) {
          const thunk = getCurrentOrder(orderId)
          dispatch(thunk)
        }
        else {
          tempOrder.lineitems.push(Object.assign({}, result.data, itemInfo));
          const action = setCurrentOrder(tempOrder);
          dispatch(action);
        }
      })
  }
}

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return action.currentOrder
    default:
      return state
  }
}

export default orderReducer
