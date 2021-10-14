import { takeLatest, put, all, call } from 'redux-saga/effects';
import userTypes from '../User/user.types';
import {
	checkExchangeDbResult,
	updateDBItemState,
	loopysTransaction,
} from './exchange.utils';
import { setExchanges } from './exchange.actions';
import exchangeTypes from './exchange.types';

export function* reloadExchangeItems({ payload }) {
	try {
		const userExchangeItems = yield checkExchangeDbResult(payload);
		yield put(setExchanges(userExchangeItems));
	} catch (er) {
		console.error(er);
	}
}

export function* onReloadExchangeItemStart() {
	yield takeLatest(exchangeTypes.RELOAD_EXCHANGE_STATE, reloadExchangeItems);
}

export function* validExchange({ payload }) {
	const { documentId } = payload;
	yield updateDBItemState({ state: 'accepted', itemId: documentId });
}

export function* onConfirmExchangeStart() {
	yield takeLatest(exchangeTypes.CONFIRM_EXCHANGE_START, validExchange);
}

export function* validReception({ payload }) {
	const { documentId, askedBy, authorId, loopysValue } = payload;
	const askerId = askedBy.uid;
	yield updateDBItemState({ state: 'done', itemId: documentId });
	yield loopysTransaction(loopysValue, askerId, authorId);
	const userExchangeItems = yield checkExchangeDbResult({
		uid: askedBy.uid,
		askerName: askedBy.askerName,
	});
	yield put(setExchanges(userExchangeItems));
}

export function* onConfirmReceptionStart() {
	yield takeLatest(exchangeTypes.CONFIRM_RECEPTION_START, validReception);
}

export default function* exchangeSagas() {
	yield all([
		call(onReloadExchangeItemStart),
		call(onConfirmExchangeStart),
		call(onConfirmReceptionStart),
	]);
}
