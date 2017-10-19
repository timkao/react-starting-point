import axios from 'axios';

const CHECKOUT = 'CHECKOUT';

const checkout = (orderId) => {
	return {
		type: CHECKOUT,
		orderId: orderId
	}
}

export const checkoutOrder = (orderId) => {
	return (dispatch) => {
		axios.put(`/api/orders/${orderId}`)
		.then(() => {
			dispatch(checkout(orderId));
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