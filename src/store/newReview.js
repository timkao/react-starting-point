import axios from 'axios';
import {fetchReviews, getReviews, reviewsReducer} from './reviews'
const CREATE_REVIEW_TITLE = 'CREATE_REVIEW_TITLE'
const CREATE_REVIEW_CONTENT = 'CREATE_REVIEW_CONTENT'


export function createReviewTitle(title){
	const action = {type: CREATE_REVIEW_TITLE, title}
	return action
}

export function createReviewContent(content){
	const action = {type: CREATE_REVIEW_CONTENT, content}
	return action
}

export function postReview(review, productId){
	
	return function thunk (dispatch) {
		return axios.post('/api/reviews', review)
			.then(res => res.data)
			.then(review => {
				const action = fetchReviews(productId)
				dispatch(action)
			})
	}
}

export function newReviewTitleReducer(state='', action){
	switch(action.type){
		case CREATE_REVIEW_TITLE:
			return action.title
		default:
			return state
	}
}

export function newReviewContentReducer(state='', action){
	switch(action.type){
		case CREATE_REVIEW_CONTENT:
			return action.content
		default:
			return state
	}
}
