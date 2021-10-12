import itemsTypes from './items.types';

export const addItemStart = (itemData) => ({
	type: itemsTypes.ADD_NEW_ITEM_START,
	payload: itemData,
});

export const fetchItemsStart = (filters = {}) => ({
	type: itemsTypes.FETCH_ITEMS_START,
	payload: filters,
});

export const setItems = (items) => ({
	type: itemsTypes.SET_ITEMS,
	payload: items,
});

export const validItem = (documentId) => ({
	type: itemsTypes.VALIDATION_ITEM_START,
	payload: documentId,
});

export const deleteItemStart = (itemId, pageSize = null) => ({
	type: itemsTypes.DELETE_ITEM_START,
	payload: { itemId, pageSize },
});

export const fetchItemStart = (itemId) => ({
	type: itemsTypes.FETCH_ITEM_START,
	payload: itemId,
});

export const setItem = (item) => ({
	type: itemsTypes.SET_ITEM,
	payload: item,
});
