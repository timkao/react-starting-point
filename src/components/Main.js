import React, {Component} from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'
// import store from '../store';
// import {thunk actions come here later} from '../store';

export default class Main extends Component{
	componentDidMount(){
		//if we have thunks (maybe for getting categories for navbar? hm)
	}

	render(){
		return(
			<Router>
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						
					</Switch>
					
				</div>
			</Router>
			)
		
	}
}