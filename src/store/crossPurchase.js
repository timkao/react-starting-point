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
  let crossList = [];
  const listLimit = 6;
  const countList = {}
  return function(dispatch){
    axios.get('/api/orders')
    .then(result => result.data)
    .then( orders => {

      // find orders with the same productId
      orders = orders.filter( order => {
        for (var i = 0; i < order.lineitems.length ; i++) {
          if (order.lineitems[i].productId === productId) {
            return true;
          }
        }
        return false;
      })

      // count number of times a product shows up
      orders.forEach( order => {
        order.lineitems.forEach( item => {
          if (item.productId !== productId) {
            if (!countList[item.productId]){
              countList[item.productId] = [1, item.product]
            }
            else {
              countList[item.productId][0] += 1
            }
          }
        })

        // from object to list
        Object.keys(countList).forEach( key => {
          crossList.push(countList[key])
        })

        // sort by count
        crossList.sort(function(a, b){
          return b[0] - a[0]
        })

        // take the top 6
        if (crossList.length > 6) {
          crossList = crossList.slice(0, listLimit)
        }
        // if I change to "crossList", then it doesn't work....
        const crossList2 = crossList.map( pair => {
          return pair[1]
        })

        const action = getCrossPurchase(crossList2)
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
