import axios from 'axios'


// action
const GET_SAVED_PRODUCTS = 'GET_SAVED_PRODUCTS'

// action creator
export const getSavedProducts = (products) => {
  return {
    type: GET_SAVED_PRODUCTS,
    savedProducts: products
  }
}

export const fetchSaveProducts = () => {
  return function(dispatch) {
    axios.get('api/users/savelist')
    .then(result => result.data)
    .then( products => {
      const action = getSavedProducts(products)
      dispatch(action)
    })
  }
}

export const saveToList = (productInfo) => {
  return function(dispatch){
    axios.put('/api/users/savelist', productInfo)
    .then( result => result.data )
    .then( products => {
      const action = getSavedProducts(products)
      dispatch(action)
    })
  }
}

export const removeFromList = (productId) => {
  return function(dispatch){
    axios.put(`/api/users/savelist/${productId}`)
    .then( result => result.data )
    .then( products => {
      const action = getSavedProducts(products)
      dispatch(action)
    })
  }
}

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_SAVED_PRODUCTS:
      return action.savedProducts
    default:
      return state
  }
}

export default reducer
