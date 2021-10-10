import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import itemsReducer from './Items/items.reducer';
import exchangeReducer from './Exchange/exchange.reducer';

export const rootReducer = combineReducers({
	user: userReducer,
	items: itemsReducer,
	exchange: exchangeReducer,
});

const configStorage = {
	key: 'root',
	storage,
	whitelist: ['exchange'],
};

export default persistReducer(configStorage, rootReducer);
