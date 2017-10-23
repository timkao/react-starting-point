import axios from 'axios';
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

export function postReview(student){
	return function thunk (dispatch) {
		return axios.post('/api/students', student)
			.then(res => res.data)
			.then(student => {
				const action = getStudent(student[0])
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
