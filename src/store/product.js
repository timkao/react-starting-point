import axios from 'axios'
// action
const GET_PRODUCT = 'GET_PRODUCT'

// action creator
export const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product
  }
}

export function fetchProduct(productId){
  return function thunk(dispatch){
    return axios.get(`/api/products/${productId}`)
      .then(res=>res.data)
      .then(product => {
        const action = getProduct(product)
        dispatch(action)
      })
  }
}

// reducer
const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default productReducer
