import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'
import Product from './Product'
import store, {fetchCategories, getCurrentOrder, fetchSaveProducts, fetchHistoryPurchases} from '../store';
// import {thunk actions come here later} from '../store';
<<<<<<< HEAD
import Auth from './Auth'
import Review from './Review'
=======
import Auth from './Auth';
import Cart from './Cart';
import Checkout from './Checkout';
import Admin from './AdminProduct';
import Products from './Products';
>>>>>>> e811f3d2c643089844f9995c127eb4c0e4a913af

export default class Main extends Component {

	componentDidMount(){
		const categoriesThunk = fetchCategories();
		store.dispatch(categoriesThunk);
	}
	render(){
		return(
				<div>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/categories/:categoryName" component={Products} />
							<Route exact path="/product/:productId" component={Product} />
							<Route exact path="/signup" component={Auth} />
							<Route exact path="/login" component={Auth} />
<<<<<<< HEAD
							<Route exact path="/reviews/:productId" component={Review} />
=======
							<Route exact path="/cart" component={Cart} />
							<Route exact path="/checkout" component={Checkout} />
							<Route exact path="/admin" component={Admin} />
>>>>>>> e811f3d2c643089844f9995c127eb4c0e4a913af
						</Switch>
					</div>
				</div>

			)
	}
}

//I moved out Navbar from the container so that it will span across the top
//I made up the categories route, whoever made the view (products?) can replace it!
