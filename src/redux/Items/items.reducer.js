import itemsTypes from './items.types';

const initialState = {
	items: [],
};
const itemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case itemsTypes.SET_ITEMS:
			return { ...state, items: action.payload };

		default:
			return state;
	}
};

export default itemsReducer;
