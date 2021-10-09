import exchangeTypes from './exchange.types';

export const addItem = (nextExchangeItem) => ({
	type: exchangeTypes.ADD_TO_EXCHANGE,
	payload: nextExchangeItem,
});
