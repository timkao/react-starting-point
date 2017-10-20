import axios from 'axios'
import { keyinPassword } from './'
//import db from '../../db'

const KEYIN_EMAIL = 'USER_EMAIL';

export const keyinEmail = (emailInput) => {
  return {
    type: KEYIN_EMAIL,
    emailInput: emailInput
  }
};

export const signupUser = (signupData, history) => {
  return function(dispatch) {
    axios.post('/signup', signupData)
    .then( result => {
      dispatch(keyinEmail(''));
      dispatch(keyinPassword(''));
      if (typeof result.data !== 'string') {
        history.push('/');
      }
      else {
        console.log(result.data)
      }
    })
    .catch( err => {
      console.log('signup failed!', err.message);
    })
  }
};

export const loginUser = (loginData, history) => {
  return function(dispatch) {
    axios.post('/login', loginData)
    .then( result => {
      dispatch(keyinEmail(''));
      dispatch(keyinPassword(''));
      if (typeof result.data !== 'string') {
        history.push('/');
      }
      else {
        console.log(result.data)
      }
    })
    .catch( err => {
      console.log('login failed!', err.message);
    })
  }
};


export const logoutUser = () => {
  return function(dispatch) {
    axios.put('/logout')
    .then( result => result.data)
    .then( message => {
      console.log(message)
    })
  }
};

export const authGoogle = () => {
  return function(dispatch) {
    axios.get('/auth/google')
    .then(result => {
      console.log('hits google thunk')
    })
  }
};

const reducer = (state = '', action) => {
  switch (action.type) {
    case KEYIN_EMAIL:
      return action.emailInput
    default:
      return state
  }
};



export default reducer;
