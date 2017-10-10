import React from 'react'
import { connect } from 'react-redux'

function Navbar(props){


	return (
		<div>{props.products[0]}</div>
	)
}

const mapToState = (state) => {
	return {
		products: state.products
	}
}

const mapToDispatch = (dispatch) => {
	return {

	}
}

const NavbarContainer = connect(mapToState, mapToDispatch)(Navbar)
export default NavbarContainer
