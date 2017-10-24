import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, {createReviewTitle, createReviewContent, postReview} from '../store';

class ReviewForm extends Component{
	constructor(props){
		super(props);
		this.state = {clickedRate:''}
		this.setRate = this.setRate.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	setRate(rate){
		this.setState({clickedRate:rate})
	}

	handleSubmit(e){
		e.preventDefault();
		
		store.dispatch(postReview({
			title: e.target.titleInput.value, 
			content: e.target.contentInput.value, 
			rating: this.state.clickedRate,
			productId: this.props.productId*1,
			userId: this.props.currentUser.id*1
			// userId: 1
		}, this.props.productId))
		store.dispatch(createReviewTitle(''))
		store.dispatch(createReviewContent(''))

		}

	render(){

		const {handleChange, titleInput, contentInput} = this.props
	
		return(
			<div>
				<div className="row">
				<form onSubmit={this.handleSubmit}>
					<div className="row formRow">
						<div className="col-md-1">
							<label>Title</label>
						</div>
						<div className="col-md-8">
							<input name="title" type="title" onChange={handleChange} value={titleInput} id="titleInput"/>
						</div>
					</div>
					
					<div className="row formRow">
						<div className="col-md-1">
							<label>Rating</label>
						</div>
						
						{
							[1, 2, 3, 4, 5].map(rate =>{

								return(
									<div className="col-md-3 rateCircle" key={rate}>
										<span  key={rate} >
											<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" onClick={()=>this.setRate(rate)}>
											    <circle id={rate} cx="13" cy="13" r="12" fill="#FFFFB2" strokeWidth={this.state.clickedRate==rate?3:1} stroke="black" width="20" />
											    <text x="13" y="13" textAnchor="middle" alignmentBaseline="middle">{rate}</text>
											</svg>
										</span>
									</div>
									)
							})
						}
						
					</div>

					<div className="row formRow">
						<div className="col-md-1">
							<label>Content</label>
						</div>
						<div className="col-md-8">
							<input name="content" type="content" onChange={handleChange} value={contentInput} id="contentInput" />
						</div>
					</div>
					<div className="row formRow">
						<div className="col-md-9">
							<button className="btn btn-default single_btn reviewButton">Submit Review</button>
						</div>
					</div>

				</form>
				</div>
			</div>
			
			)
	}
}
	

const mapToState = (state, ownProps) => {

	return {
		titleInput: state.titleInput,
		contentInput: state.contentInput,
		clickedRate: state.clickedRate,
		productId: ownProps.productId,
		currentUser: state.currentUser

	}
}

const mapToDispatch = (dispatch, ownProps) => {

	return {
		handleChange(e){
			if(e.target.name === 'title'){
				dispatch(createReviewTitle(e.target.value))
			}
			else if(e.target.name === 'content'){
				dispatch(createReviewContent(e.target.value))	
			}
		},
		
	}
}

const ReviewContainer = connect(mapToState, mapToDispatch)(ReviewForm)
export default ReviewContainer

/*

*/