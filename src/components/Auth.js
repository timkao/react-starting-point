import React from 'react'
import { connect } from 'react-redux'
import { keyinEmail, keyinPassword } from '../store'

function Auth(props) {

  const { emailInput, handleChange, passwordInput } = props

  return (
    <div className="row">
      <div className="col-lg-6">
        <form>
          <label>Email: </label>
          <input name="email" type="email" onChange={handleChange} value={emailInput} /><br></br>
          <label>Password: </label>
          <input name="password" type="password" onChange={handleChange} value={passwordInput} /><br></br>
          <input type="submit" />
        </form>
      </div>
      <div className="col-lg-6">Third Party</div>
    </div>
  )
}

const mapToState = (state) => {
  return {
    emailInput: state.emailInput,
    passwordInput: state.passwordInput
  }
}

const mapToDispatch = (dispatch) => {
  return {
    handleChange(evt) {
      if (evt.target.name === 'email'){
        dispatch(keyinEmail(evt.target.value))
      }
      else if (evt.target.name === 'password') {
        dispatch(keyinPassword(evt.target.value))
      }
    }
  }
}

const authContainer = connect(mapToState, mapToDispatch)(Auth)

export default authContainer
