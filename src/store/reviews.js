
import axios from 'axios'
// action
const GET_REVIEWS = 'GET_REVIEWS'

// action creator
export const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

//thunk
export function fetchReviews (productId) {
  return function thunk (dispatch) {
    return axios.get(`/api/reviews/${productId}`)
      .then(res => res.data)
      .then(reviews => {
        const action = getReviews(reviews);
        dispatch(action);
      });
  }
}


// reducer
const reviewsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    default:
      return state
  }
}

export default reviewsReducer
