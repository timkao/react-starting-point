import axios from 'axios'
// action
const GET_CATEGORIES = 'GET_CATEGORIES'

// action creator
export const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

//thunk
export function fetchCategories () {
  return function thunk (dispatch) {
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        const action = getCategories(categories);
        dispatch(action);
      });
  }
}


// reducer
const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default categoriesReducer
