import axios from 'axios'
// action
const SET_NAVBAR_ACTIVE = 'SET_NAVBAR_ACTIVE'

// action creator
export const setNavbarActive = (category) => {
  return {
    type: SET_NAVBAR_ACTIVE,
    category
  }
}

// //thunk
// export function fetchCategories () {
//   return function thunk (dispatch) {
//     return axios.get('/api/categories')
//       .then(res => res.data)
//       .then(categories => {
//         const action = getCategories(categories);
//         dispatch(action);
//       });
//   }
// }


// reducer
const navbarActiveReducer = (state = 'hallo?', action) => {
  switch (action.type) {
    case SET_NAVBAR_ACTIVE:
      return action.category
    default:
      return state
  }
}

export default navbarActiveReducer
