// action
const GET_PRODUCTS = 'GET_PRODUCTS'

// action creator
export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products: products
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
