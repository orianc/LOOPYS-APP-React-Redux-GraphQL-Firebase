import exchangeTypes from './exchange.types';
import userTypes from '../User/user.types';
import {
	handleAddToExchange,
	handleRemoveExchangeItem,
	handleClearExchangeHistory,
} from './exchange.utils';

const initialState = {
	exchangeItems: [],
};

const exchangeReducer = (state = initialState, action) => {
	switch (action.type) {
		case exchangeTypes.ADD_TO_EXCHANGE:
			return {
				...state,
				exchangeItems: handleAddToExchange({
					prevExchangeItems: state.exchangeItems,
					nextExchangeItems: action.payload,
				}),
			};
		case exchangeTypes.SET_EXCHANGE:
			return {
				...state,
				exchangeItems: action.payload,
			};
		case userTypes.SIGN_OUT_USER_SUCCESS:
			return {
				...state,
				exchangeItems: initialState,
			};
		case exchangeTypes.REMOVE_EXCHANGE_ITEM:
			return {
				...state,
				exchangeItems: handleRemoveExchangeItem({
					prevExchangeItems: state.exchangeItems,
					exchangeItemToRemove: action.payload,
				}),
			};
		case exchangeTypes.CLEAR_EXCHANGE_HISTORY:
			return {
				...state,
				exchangeItems: handleClearExchangeHistory(action.payload),
			};
		default:
			return state;
	}
};

export default exchangeReducer;
