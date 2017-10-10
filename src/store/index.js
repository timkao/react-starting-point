import {createStore, applyMiddleware, combineReducers} from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import products from './products';
import product from './product';

const reducer = combineReducers(
	{products, products}
	);

const store = createStore(
	reducer, applyMiddleware(loggerMiddleware, thunkMiddleware)
	);

export default store;

export * from './products';
export * from './product';
