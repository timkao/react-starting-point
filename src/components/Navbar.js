import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, { logoutUser, getSavedProducts, getHistoryPurchases, getCurrentOrder, setNavbarActive, getCurrentUser } from '../store';

class Navbar extends Component{
	constructor(props){
		super(props);
		// this.state = {}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e){
			if(e.target.id == 'logo'){
				store.dispatch(setNavbarActive(''))
			}
			else {
				store.dispatch(setNavbarActive(e.target.id))
			}
    }

    render(){
			console.log(this.props.navbarActive)
			console.log(this.props.currentUser);
			let showAdmin;
			if (this.props.currentUser.userType &&  this.props.currentUser.userType === 'admin') {
				showAdmin = true;
			}
			else {
				showAdmin = false;
			}
    	const more_cats = this.props.categories.filter(cat => cat.name!='Men' && cat.name != 'Women' && cat.name!= 'Kids')
		return(
			<nav className="navbar navbar-default">
			  <div className="wrapper">
			      <a onClick={this.handleClick} className="navbar-brand" id='logo' href="#">Mayo Jar</a>

			      <ul className="nav navbar-nav">
			        <li onClick={this.handleClick} className={this.props.navbarActive=="Men"?"active":"inactive"}><Link to='/categories/Men' id="Men">Men</Link></li>
			        <li onClick={this.handleClick} className={this.props.navbarActive=="Women"?"active":"inactive"}><Link to='/categories/Women' id='Women'>Women</Link></li>
			        <li onClick={this.handleClick} className={this.props.navbarActive=="Kids"?"active":"inactive"}><Link to='/categories/Kids' id="Kids">Kids</Link></li>

			        <li className="dropdown">
			          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More...<span className="caret"></span></a>
			          <ul className="dropdown-menu">
			            {more_cats.map(cat => {
			        	return(<li key={cat.id} onClick={this.handleClick} className={this.props.navbarActive==cat.name?"active":"inactive"}>
			        		<Link to={`/categories/${cat.name}`} id={cat.name}>{cat.name}</Link>
			        		</li>)
			        }) }
			          </ul>
			        </li>

							{
								showAdmin && <li onClick={this.handleClick} className={this.props.navbarActive=="admin"?"active":"inactive"}><Link to='/Admin' id='admin'>Admin</Link></li>
							}

			      </ul>

			      <ul className="nav navbar-nav navbar-right">
			        <li onClick={this.handleClick} className={this.props.navbarActive=="signup"?"active":"inactive"}><Link to="/signup" id='signup'>Sign up</Link></li>
			        <li onClick={this.handleClick} className={this.props.navbarActive=="login"?"active":"inactive"}><Link to="/login" id='login'>Log in</Link></li>
					<li onClick={this.props.leaveApp}><Link to="/">Log out</Link></li>
			        <li onClick={this.handleClick} className={this.props.navbarActive=="cart"?"active":"inactive"}><Link to="/cart" id='cart'>Cart</Link></li>
			      </ul>

			  </div>
			</nav>)
    }
}


const mapToState = (state) => {
	console.log(state)
	return {
		products: state.products,
		categories: state.categories,
		navbarActive: state.navbarActive,
		currentUser: state.currentUser
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
			dispatch(getCurrentOrder());
			dispatch(getCurrentUser());
    	},

	}
}

const NavbarContainer = connect(mapToState, mapToDispatch)(Navbar)
export default NavbarContainer

/*
<div>{props.products[0]}</div>

<Link className="thumbnail" to={`/albums/${album.id}`}>
*/

