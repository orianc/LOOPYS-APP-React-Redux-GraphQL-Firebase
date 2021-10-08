import itemsTypes from './items.types';

const initialState = {
	items: [],
	item: {},
};
const itemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case itemsTypes.SET_ITEMS:
			return { ...state, items: action.payload };
		case itemsTypes.SET_ITEM:
			return { ...state, item: action.payload };
		default:
			return state;
	}
};

export default itemsReducer;
