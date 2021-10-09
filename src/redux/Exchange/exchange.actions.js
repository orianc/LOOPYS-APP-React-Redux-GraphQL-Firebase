import exchangeTypes from './exchange.types';

export const addItem = (nextExchangeItem) => ({
	type: exchangeTypes.ADD_TO_EXCHANGE,
	payload: nextExchangeItem,
});

export const removeExchangeItem = (exchangeItem) => ({
	type: exchangeTypes.REMOVE_EXCHANGE_ITEM,
	payload: exchangeItem,
});
