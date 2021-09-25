import { takeLatest, put, all, call } from 'redux-saga/effects';
import itemsTypes from './items.types';
import { fetchItemsStart, setItems } from './items.actions';
import {
	handleAddItem,
	handleAddImage,
	handleFetchItems,
	handleFetchPhotos,
	handleDeleteItem,
} from './items.helpers';

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
		state,
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
			state,
		}).then(() => handleAddImage(photos, id));
	} catch (err) {
		yield console.error('on add item saga', err);
	}
}

export function* onAddItemStart() {
	yield takeLatest(itemsTypes.ADD_NEW_ITEM_START, addItem);
}

export function* fetchItems() {
	try {
		const items = yield handleFetchItems();
		// const itemsFullData = [];
		// yield items.map((item) => {
		// 	var imageUrl = handleFetchPhotos(item.id);
		// 	item.imageUrl = imageUrl;
		// 	return itemsFullData.push(item);
		// });
		// yield console.log('item fulldata = ', itemsFullData);
		yield put(setItems(items));
	} catch (err) {
		// console.error(err);
	}
}

export function* onFetchItemsStart() {
	yield takeLatest(itemsTypes.FETCH_ITEMS_START, fetchItems);
}

export function* deleteItem({ payload }) {
	try {
		yield handleDeleteItem(payload);
		yield put(fetchItemsStart());
	} catch (e) {
		// console.error(e);
	}
}

export function* onDeleteItemStart() {
	yield takeLatest(itemsTypes.DELETE_ITEM_START, deleteItem);
}

export default function* itemsSagas() {
	yield all([
		call(onAddItemStart),
		call(onFetchItemsStart),
		call(onDeleteItemStart),
	]);
}
