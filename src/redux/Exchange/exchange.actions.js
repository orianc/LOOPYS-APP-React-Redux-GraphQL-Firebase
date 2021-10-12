import exchangeTypes from './exchange.types';

export const addItem = (nextExchangeItem, askerName) => ({
	type: exchangeTypes.ADD_TO_EXCHANGE,
	payload: { nextExchangeItem, askerName },
});

export const removeExchangeItem = (exchangeItem) => ({
	type: exchangeTypes.REMOVE_EXCHANGE_ITEM,
	payload: exchangeItem,
});

export const setExchanges = (exchange) => ({
	type: exchangeTypes.SET_EXCHANGE,
	payload: exchange,
});
