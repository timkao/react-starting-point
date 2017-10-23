import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, {createReviewTitle, createReviewContent, postReview} from '../store';

class ReviewForm extends Component{
	constructor(props){
		super(props);
		this.state = {clickedRate:''}
		this.setRate = this.setRate.bind(this)
	}

	setRate(rate){
		this.setState({clickedRate:rate})
	}
	render(){
		console.log(this.props)
		console.log(this.state)
		const {handleSubmit, handleChange, titleInput, contentInput} = this.props
	
		return(
			<div>
				<div className="row">
				<form onSubmit={handleSubmit}>
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
										<span onClick={()=>this.setRate(rate)} key={rate} >
											<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
											    <circle id={rate} cx="13" cy="13" r="10" fill="none" strokeWidth={this.state.clickedRate==rate?3:1} stroke="black" width="20" />
											    <text x="9" y="18" >{rate}</text>
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
	

const mapToState = (state) => {

	return {
		titleInput: state.titleInput,
		contentInput: state.contentInput,
		clickedRate: state.clickedRate

	}
}

const mapToDispatch = (dispatch) => {
	return {
		handleChange(e){
			if(e.target.name === 'title'){
				dispatch(createReviewTitle(e.target.value))
			}
			else if(e.target.name === 'content'){
				dispatch(createReviewContent(e.target.value))	
			}
		},
		handleSubmit(e){
			e.preventDefault();
			console.log(e.target.titleInput)
			// const campusId = ownProps.match.params.campusId
			dispatch(postReview({title: e.target.titleInput.value, content: e.target.contentInput.value, rating: this.state.clickedRate}))
			dispatch(createReviewTitle(''))
			dispatch(createReviewContent(''))

		}
	}
}

const ReviewContainer = connect(mapToState, mapToDispatch)(ReviewForm)
export default ReviewContainer

/*

*/