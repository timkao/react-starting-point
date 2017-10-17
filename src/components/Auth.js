import React from 'react'
import { connect } from 'react-redux'
import { keyinEmail, keyinPassword, signupUser, logoutUser, loginUser } from '../store'

function Auth(props) {

  const { emailInput, handleChange, passwordInput, submitUser, leaveApp } = props
  const authPath = props.location.pathname === '/signup' ? 'sign up' : 'log in'

  return (
    <div className="row">
      <div className="col-lg-6">
        <form onSubmit={submitUser}>
          <label>Email: </label>
          <input name="email" type="email" onChange={handleChange} value={emailInput} /><br></br>
          <label>Password: </label>
          <input name="password" type="password" onChange={handleChange} value={passwordInput} /><br></br>
          <button className="btn btn-default">{authPath}</button>
        </form>
      </div>
      <div className="col-lg-6">Third Party
        <button onClick={leaveApp} className="btn btn-default">logout</button>
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
      ? signupUser(userInfo) : loginUser(userInfo);

      dispatch(thunk);
    },
    leaveApp(evt) {
      evt.preventDefault()
      const thunk = logoutUser()
      dispatch(thunk)
    }
  }
}

const authContainer = connect(mapToState, mapToDispatch)(Auth)

export default authContainer