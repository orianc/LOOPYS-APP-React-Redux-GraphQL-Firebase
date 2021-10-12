import { takeLatest, put, all, call } from 'redux-saga/effects';
import userTypes from '../User/user.types';
import { checkExchangeDbResult } from './exchange.utils';
import { setExchanges } from './exchange.actions';

export function* reloadExchangeItems({ payload }) {
	try {
		const userExchangeItems = yield checkExchangeDbResult(payload);
		yield put(setExchanges(userExchangeItems));
	} catch (er) {
		console.error(er);
	}
}

export function* onReloadExchangeItemStart() {
	yield takeLatest(userTypes.SIGN_IN_SUCCESS, reloadExchangeItems);
}

export default function* exchangeSagas() {
	yield all([call(onReloadExchangeItemStart)]);
}
