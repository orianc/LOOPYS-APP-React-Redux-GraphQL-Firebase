import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddle from '@redux-saga/core';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sageMiddleware = createSagaMiddle();
export const middleWares = [thunk, sageMiddleware, logger];

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleWares)),
);
sageMiddleware.run(rootSaga);
export default store;
