import { all, call } from '@redux-saga/core/effects';
import userSagas from './User/user.sagas';
import itemsSagas from './Items/items.sagas';
import exchangeSagas from './Exchange/exchange.sagas';

export default function* rootSaga() {
	yield all([call(userSagas), call(itemsSagas), call(exchangeSagas)]);
}
