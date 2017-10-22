import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, {fetchReviews} from '../store';

class Review extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(props){
		const productId = this.props.productId*1
		const reviewThunk = fetchReviews(productId)
		store.dispatch(reviewThunk)
	}
	
	render(){
		console.log(this.props)
		const reviewsArray = this.props.reviews
		return(
			<div>
				<div className="row">
					<hr/>
					<h2 className="centeredHeader">Reviews</h2>
				</div>
				<div className="row">
					<div className="col-md-9">
						{reviewsArray.map(review =>{
							return(
								<div key={review.id}>
									<hr/>
									<div className="row">
										<h4>{review.title}</h4>

									</div>
									<hr/>
									<div className="row">
									</div>
								</div>
								)
						})}
					</div>
				</div>
			</div>
			)	
	}
	
}	

const mapToState = (state, ownProps) => {
	return {
		productId: ownProps.match.params.productId,
		reviews: state.reviews

	}
}

const mapToDispatch = (dispatch) => {
	return {

	}
}

const ReviewContainer = connect(mapToState, mapToDispatch)(Review)
export default ReviewContainer
