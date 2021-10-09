import exchangeTypes from './exchange.types';
import { handleAddToExchange } from './exchange.utils';
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

		default:
			return state;
	}
};

export default exchangeReducer;
