import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';
import itemsReducer from './Items/items.reducer';
import exchangeReducer from './Exchange/exchange.reducer';

export default combineReducers({
	user: userReducer,
	items: itemsReducer,
	exchange: exchangeReducer,
});
