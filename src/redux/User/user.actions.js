import { auth, handleUserProfile } from '../../firebase/utils';
import userTypes from './user.types';

export const setCurrentUser = (user) => ({
	type: userTypes.SET_CURRENT_USER,
	payload: user,
});

export const signInUser =
	({ email, password }) =>
	async (dispatch) => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
			dispatch({
				type: userTypes.SIGN_IN_SUCCESS,
				payload: true,
			});
		} catch (err) {
			// 	console.error('Error on submit login form', err);
		}
	};

export const signUpUser =
	({ displayName, email, password, confirmPassword }) =>
	async (dispatch) => {
		if (password !== confirmPassword) {
			let err = ['Les mots de passe ne correspondent pas.'];
			dispatch({
				type: userTypes.SIGN_UP_ERROR,
				payload: err,
			});
			return;
		}
		if (!email || !displayName || !password) {
			let err = ['Il manque champs'];
			dispatch({
				type: userTypes.SIGN_UP_ERROR,
				payload: err,
			});
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			await handleUserProfile(user, { displayName });
			dispatch({
				type: userTypes.SIGN_UP_SUCCESS,
				payload: true,
			});
		} catch (err) {
			return console.error('error', err.code, 'on form submission', err.message);
		}
	};
