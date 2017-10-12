import {createStore, applyMiddleware, combineReducers} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import products from './products';
import emailInput from './email';
import passwordInput from './password';
import product from './product';

const reducer = combineReducers(
	{
    products,
    emailInput,
    passwordInput
	}
);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger
  ))
);

export default store;

export * from './products';
export * from './product';
export * from './email';
export * from './password';
