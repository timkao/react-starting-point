import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, {fetchReviews} from '../store';
import ReviewForm from './ReviewForm';

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
		
		const reviewsArray = this.props.reviews
		return(
			<div>
				<div className="row">
					<hr/>
					<div className="col-md-9">
						<h2 className="centeredHeader">Reviews</h2>
					</div>
				</div>

				<div className="row">
					<ReviewForm/>
				</div>

				<div className="row">
					<div className="col-md-9">
						{reviewsArray.map(review =>{
							return(
								<div key={review.id}>
									<hr/>
									<div className="row">
										<h4>{review.title}</h4>
										<h5>{review.user.name}</h5>
										<h5>{`rating: ${review.rating}`}</h5>
										<p>{review.content}</p>

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
		productId: ownProps.productId,
		reviews: state.reviews

	}
}

const mapToDispatch = (dispatch) => {
	return {

	}
}

const ReviewContainer = connect(mapToState, mapToDispatch)(Review)
export default ReviewContainer
