import itemsTypes from './items.types';

export const addItemStart = (itemData) => ({
	type: itemsTypes.ADD_NEW_ITEM_START,
	payload: itemData,
});
