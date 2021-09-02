import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export const middleWares = [thunk, logger];

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleWares)),
);

export default store;
