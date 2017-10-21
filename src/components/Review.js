import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, {fetchProduct} from '../store';

class Review extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(props){
		
	}
	
	render(){
		return(
			<div>
				<hr/>
				<h2 className="centeredHeader">Reviews</h2>
			</div>
			)	
	}
	
}	

const mapToState = (state, ownProps) => {
	return {
	
	}
}

const mapToDispatch = (dispatch) => {
	return {

	}
}

const ReviewContainer = connect(mapToState, mapToDispatch)(Review)
export default ReviewContainer
