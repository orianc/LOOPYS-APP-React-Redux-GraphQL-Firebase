import userTypes from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	userError: false,
	resetPasswordSuccess: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				userError: [],
			};
		case userTypes.CHECK_USER_SESSION:
			return {
				...state,
				currentUser: action.payload,
			};

		case userTypes.SIGN_OUT_USER_START:
			return {
				...state,
				currentUser: action.payload,
			};
		case userTypes.RESET_USER_STATE:
		case userTypes.SIGN_OUT_USER_SUCCESS:
			return {
				...state,
				...INITIAL_STATE,
			};
		case userTypes.USER_ERROR:
			return {
				...state,
				userError: action.payload,
			};
		case userTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordSuccess: action.payload,
			};

		default:
			return state;
	}
};

export default userReducer;
