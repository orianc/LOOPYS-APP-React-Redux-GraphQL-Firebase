import { takeLatest, put, all, call } from 'redux-saga/effects';
import itemsTypes from './items.types';
import { fetchItemsStart, setItems, setItem } from './items.actions';
import {
	handleAddItem,
	handleAddImage,
	handleFetchItems,
	handleFetchPhotos,
	handleDeleteItem,
	handleValidItem,
	handleFetchItem,
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
		keyWords,
	},
}) {
	try {
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
			keyWords,
		}).then(() => handleAddImage(photos, id));
	} catch (err) {
		yield console.error('on add item saga', err);
	}
}

export function* onAddItemStart() {
	yield takeLatest(itemsTypes.ADD_NEW_ITEM_START, addItem);
}

export function* fetchItems({ payload }) {
	try {
		const items = yield handleFetchItems(payload);
		yield put(setItems(items));
	} catch (err) {
		console.error(err);
	}
}

export function* onFetchItemsStart() {
	yield takeLatest(itemsTypes.FETCH_ITEMS_START, fetchItems);
}

export function* deleteItem({ payload }) {
	try {
		yield handleDeleteItem(payload);
		yield put(fetchItemsStart({ pageSize: null }));
	} catch (e) {
		console.error(e);
	}
}

export function* onDeleteItemStart() {
	yield takeLatest(itemsTypes.DELETE_ITEM_START, deleteItem);
}

export function* validItem({ payload }) {
	try {
		yield handleValidItem(payload);
	} catch (err) {
		console.error(err);
	}
}

export function* onValidationItemStart() {
	yield takeLatest(itemsTypes.VALIDATION_ITEM_START, validItem);
}

export function* fetchItem({ payload }) {
	try {
		const item = yield handleFetchItem(payload);
		yield put(setItem(item));
	} catch (err) {
		// console.error(err);
	}
}

export function* onFetchItemStart() {
	yield takeLatest(itemsTypes.FETCH_ITEM_START, fetchItem);
}

export default function* itemsSagas() {
	yield all([
		call(onAddItemStart),
		call(onFetchItemsStart),
		call(onDeleteItemStart),
		call(onValidationItemStart),
		call(onFetchItemStart),
	]);
}
