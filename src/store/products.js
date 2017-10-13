import axios from 'axios'


// action
const GET_PRODUCTS = 'GET_PRODUCTS'

// action creator
export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products: products
  }
}

export const getProductsbyOrderId = (id) => {
  return function(dispatch) {
    axios.get(`/api/orders/all/${id}`)
    .then( result => result.data)
    .then( order => {
      const productsInCart = order.lineitems.map( lineitem => {
        lineitem.product.quantity = lineitem.quantity
        return lineitem.product
      })
      const action = getProducts(productsInCart)
      dispatch(action)
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
