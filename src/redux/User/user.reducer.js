import userTypes from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	signUpError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
			};

		case userTypes.SIGN_UP_ERROR:
			return {
				...state,
				signUpError: action.payload,
			};

		default:
			return state;
	}
};

export default userReducer;
