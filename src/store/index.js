import {createStore, applyMiddleware, combineReducers} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import products from './products';
import product from './product';
import emailInput from './auth';
import passwordInput from './password';
import categories from './categories';

const reducer = combineReducers(
	{
    products,
    emailInput,
    passwordInput,
    categories,
    product
	}
);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;

export * from './products';
export * from './product';
export * from './auth';
export * from './password';
export * from './categories';
