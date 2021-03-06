import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'
import Product from './Product'
import store, {fetchCategories, getCurrentOrder, fetchSaveProducts, fetchHistoryPurchases} from '../store';
// import {thunk actions come here later} from '../store';
import Auth from './Auth';
import Cart from './Cart';
import Checkout from './Checkout';
import Receipt from './Receipt';
import Admin from './AdminProduct';
import Products from './Products';
import Review from './Review'


export default class Main extends Component {

	componentDidMount(){
		const categoriesThunk = fetchCategories();
		store.dispatch(categoriesThunk);
	}
	render(){
		return(
				<div>
					<Navbar />
					<div>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/categories/:categoryName" component={Products} />
							<Route exact path="/product/:productId" component={Product} />
							<Route exact path="/signup" component={Auth} />
							<Route exact path="/login" component={Auth} />
							<Route exact path="/reviews/:productId" component={Review} />
							<Route exact path="/cart" component={Cart} />
							<Route exact path="/checkout" component={Checkout} />
							<Route exact path="/receipt" component={Receipt} />
							<Route path="/admin" component={Admin} />
							<Route component={Home} />
						</Switch>
					</div>
				</div>

			)
	}
}

//I moved out Navbar from the container so that it will span across the top
//I made up the categories route, whoever made the view (products?) can replace it!
