import itemsTypes from './items.types';

export const addItemStart = (itemData) => ({
	type: itemsTypes.ADD_NEW_ITEM_START,
	payload: itemData,
});

export const fetchItemsStart = () => ({
	type: itemsTypes.FETCH_ITEMS_START,
});

export const setItems = (items) => ({
	type: itemsTypes.SET_ITEMS,
	payload: items,
});

export const validItem = (itemId) => ({
	type: itemsTypes.VALIDATION_ITEM_START,
	payload: itemId,
});

export const deleteItemStart = (itemId) => ({
	type: itemsTypes.DELETE_ITEM_START,
	payload: itemId,
});
