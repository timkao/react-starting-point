import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, getSavedProducts, getHistoryPurchases } from '../store';

function Navbar(props){

	const more_cats = props.categories.filter(cat => cat.name!='Men' && cat.name != 'Women' && cat.name!= 'Kids')
	return(
		<nav className="navbar navbar-default">
		  <div className="container-fluid">
		      <a className="navbar-brand" href="#">Mayo Jar</a>

		      <ul className="nav navbar-nav">
		        <li className="active"><Link to='/categories/Men'>Men</Link></li>
		        <li><Link to='/categories/Women'>Women</Link></li>
		        <li><Link to='/categories/Kids'>Kids</Link></li>

		        <li className="dropdown">
		          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More...<span className="caret"></span></a>
		          <ul className="dropdown-menu">
		            {more_cats.map(cat => {
		        	return(<li key={cat.id}><Link to={`/categories/${cat.name}`}>{cat.name}</Link></li>)
		        }) }
		          </ul>
		        </li>
						<li><Link to='/Admin'>Admin</Link></li>
		      </ul>

		      <ul className="nav navbar-nav navbar-right">
		        <li><Link to="/signup">Sign up</Link></li>
		        <li><Link to="/login">Log in</Link></li>
						<li onClick={props.leaveApp}><Link to="/">Log out</Link></li>
		        <li><Link to="/cart">Cart</Link></li>
		      </ul>

		  </div>
		</nav>
		)

}

const mapToState = (state) => {
	return {
		products: state.products,
		categories: state.categories
	}
}

const mapToDispatch = (dispatch) => {
	return {
		leaveApp(evt) {
      evt.preventDefault()
      const thunk = logoutUser()
			dispatch(thunk);
			dispatch(getSavedProducts([]));
			dispatch(getHistoryPurchases([]));
    }
	}
}

const NavbarContainer = connect(mapToState, mapToDispatch)(Navbar)
export default NavbarContainer

/*
<div>{props.products[0]}</div>

<Link className="thumbnail" to={`/albums/${album.id}`}>
*/

