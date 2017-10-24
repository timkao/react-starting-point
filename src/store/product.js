import axios from 'axios';
import { fetchProducts } from './';
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

export function updateProduct(id, info) {
  return function(dispatch) {
    axios.put(`/api/products/${id}`, info)
    .then( result => result.data)
    .then( product => {
      const thunk = fetchProducts();
      dispatch(thunk);
    })
  }
}

export function removeProduct(id) {
  return function(dispatch) {
    axios.delete(`/api/products/${id}`)
    .then( () => {
      const thunk = fetchProducts();
      dispatch(thunk);
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
