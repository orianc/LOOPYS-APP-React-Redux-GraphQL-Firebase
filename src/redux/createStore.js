import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export const middleWares = [thunk, logger];
export const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
