import axios from 'axios';

const CHECKOUT = 'CHECKOUT';

const checkOut = (orderId) => {
	return {
		type: CHECKOUT,
		orderId
	}
}

export const checkoutOrder = (orderId) => {
	return (dispatch) => {
		axios.put(`/api/orders/${orderId}`)
		.then(() => {
			dispatch(checkOut());
		})
	}
}

export default function (state = {}, action) {
	switch (action.type) {
		case CHECKOUT:
			return Object.assign({});
		default:
		return state;
	}
}