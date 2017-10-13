import axios from 'axios'

// every order has a cross purchase list
// ever product has a cross purchase list

// get cross purhase by product Id

// action
const GET_CROSS_PURCASES = 'GET_CROSS_PURCASES'

export const getCrossPurchase = (productList) => {
  return {
    type: GET_CROSS_PURCASES,
    crossList: productList
  }
}

export const fetchCrossPurchase = (productId) => {
  let crossList = []
  return function(dispatch){
    axios.get('/api/orders')
    .then(result => result.data)
    .then( orders => {
      console.log(orders)
      orders = orders.filter( order => {
        for (var i = 0; i < order.lineitems.length ; i++) {
          if (order.lineitems[i].productId === productId) {
            return true;
          }
        }
        return false;
      })

      console.log('---------------')
      console.log(orders)

      orders.forEach( order => {
        order.lineitems.forEach( item => {
          if (item.productId !== productId) {
            crossList.push(item.product)
          }
        })

        const action = getCrossPurchase(crossList)
        dispatch(action)

      })

    })
  }
}

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CROSS_PURCASES:
      return action.crossList
    default:
      return state
  }
}

export default reducer
