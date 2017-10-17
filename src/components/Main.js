import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'
import Product from './Product'
import store, {fetchCategories} from '../store';
// import {thunk actions come here later} from '../store';
import Auth from './Auth'

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
							<Route exact path="/categories/:categoryName" component={Home} />
							<Route exact path="/product/:productId" component={Product} />
							<Route exact path="/signup" component={Auth} />
							<Route exact path="/login" component={Auth} />
						</Switch>
					</div>
				</div>
				
			)
	}
}

//I moved out Navbar from the container so that it will span across the top
//I made up the categories route, whoever made the view (products?) can replace it!