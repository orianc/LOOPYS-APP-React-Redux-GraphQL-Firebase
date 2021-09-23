import { takeLatest, put, all, call } from 'redux-saga/effects';
import itemsTypes from './items.types';
import { handleAddItem, handleAddImage } from './items.helpers';

export function* addItem({
	payload: {
		id,
		authorId,
		createAt,
		loopysValue,
		name,
		photos,
		resume,
		send,
		withdrawal,
		verified,
	},
}) {
	try {
		yield console.log('in addItem saga');
		yield handleAddItem({
			id,
			authorId,
			createAt,
			loopysValue,
			name,
			resume,
			send,
			withdrawal,
			verified,
		}).then(() => handleAddImage(photos, id));
	} catch (err) {
		yield console.error('on add item saga', err);
	}
}

export function* onAddItemStart() {
	yield takeLatest(itemsTypes.ADD_NEW_ITEM_START, addItem);
}

export default function* itemsSagas() {
	yield all([call(onAddItemStart)]);
}
