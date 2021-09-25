import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';
import itemsReducer from './Items/items.reducer';

export default combineReducers({
	user: userReducer,
	items: itemsReducer,
});
