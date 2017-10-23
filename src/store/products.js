import axios from 'axios';

// action
const GET_PRODUCTS = 'GET_PRODUCTS'

// action creator
export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products: products
  }
}

export const fetchProducts = () => {

  return function(dispatch) {
    axios.get('/api/products')
    .then(result => result.data)
    .then( products => {
      dispatch(getProducts(products));
    })
  }
}

// reducer
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
