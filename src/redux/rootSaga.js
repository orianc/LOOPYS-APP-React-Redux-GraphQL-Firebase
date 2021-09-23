import { all, call } from '@redux-saga/core/effects';
import userSagas from './User/user.sagas';
import itemsSagas from './Items/items.sagas';

export default function* rootSaga() {
	yield all([call(userSagas), call(itemsSagas)]);
}
