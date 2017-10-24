import React from 'react'
import { connect } from 'react-redux'
import { keyinEmail, keyinPassword, signupUser, loginUser, authGoogle, fetchCurrentUser } from '../store'

function Auth(props) {

  const { emailInput, handleChange, passwordInput, submitUser, leaveApp, signInGoogle } = props
  const authPath = props.location.pathname === '/signup' ? 'Sign Up' : 'Log In'

  return (
    <div id="auth">
      <div className="row">
        <div className="col-lg-3">
          <form onSubmit={submitUser}>
            <div className="form-group">
              <label>Email: </label>
              <input name="email" type="email" onChange={handleChange} value={emailInput} className="form-control" />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input name="password" type="password" className="form-control" onChange={handleChange} value={passwordInput} />
            </div>
            <button className="btn btn-default">{authPath}</button>
            <span className="pull-right">
            <a href='/auth/google' >{authPath} with Google</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapToState = (state) => {
  return {
    emailInput: state.emailInput,
    passwordInput: state.passwordInput
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  return {
    handleChange(evt) {
      if (evt.target.name === 'email') {
        dispatch(keyinEmail(evt.target.value))
      }
      else if (evt.target.name === 'password') {
        dispatch(keyinPassword(evt.target.value))
      }
    },
    submitUser(evt) {
      evt.preventDefault();
      const userInfo = {
        email: evt.target.email.value,
        password: evt.target.password.value
      };
      const thunk = ownProps.location.pathname === '/signup'
        ? signupUser(userInfo, ownProps.history) : loginUser(userInfo, ownProps.history);
      dispatch(thunk);
      // dispatch(fetchCurrentUser());
    },
    signInGoogle(evt) {
      evt.preventDefault()
      const thunk = authGoogle()
      dispatch(thunk)
      // dispatch(fetchCurrentUser());
    }
  }
}

const authContainer = connect(mapToState, mapToDispatch)(Auth)

export default authContainer
