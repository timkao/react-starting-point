import axios from 'axios';

const GET_CURRENTUSER = 'GET_CURRENTUSER';

export const getCurrentUser = (user) => {
  return {
    type: GET_CURRENTUSER,
    currentUser: user
  }
};

export const fetchCurrentUser = () => {
  return function(dispatch) {
    console.log('------------')
    axios.get('/api/users/currentUser')
    .then( result => result.data)
    .then( user => {
      const action = getCurrentUser(user);
      dispatch(action);
    })
  }
}


const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENTUSER:
      return action.currentUser
    default:
      return state
  }
};


export default reducer;
