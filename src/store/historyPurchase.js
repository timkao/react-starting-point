import axios from 'axios'

const GET_HISTORY_PURCASES = 'GET_HISTORY_PURCASES'

export const getHistoryPurchases = (historyList) => {
  return {
    type: GET_HISTORY_PURCASES,
    historyList: historyList
  }
}

export const fetchHistoryPurchases = () => {
  let historyList = []
  return function (dispatch) {
    axios.get('/api/users/history')
      .then(result => result.data)
      .then(orders => {
        orders.forEach(order => {

          historyList = order.lineitems.reduce(function (acc, ele) {

            if (acc.length) {
              for (var i = 0; i < acc.length; i++) {
                if (acc[i].id == ele.productId) {
                  break
                }
                if (i == acc.length - 1) {
                  ele.product.color = ele.color;
                  ele.product.size = ele.size;
                  acc.push(ele.product)
                }
              }
            }
            else {
              ele.product.color = ele.color;
              ele.product.size = ele.size;
              acc.push(ele.product)
            }
            return acc

          }, historyList)

        })
        if (historyList.length > 5) {
          historyList = historyList.slice(0, 5)
        }

        const action = getHistoryPurchases(historyList)
        dispatch(action)

      })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_HISTORY_PURCASES:
      return action.historyList
    default:
      return state
  }
}

export default reducer
