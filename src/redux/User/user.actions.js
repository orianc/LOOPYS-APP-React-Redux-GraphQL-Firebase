import userTypes from './user.types';
import { auth, handleUserProfile, GoogleProvider } from '../../firebase/utils';

export const emailSignInStart = (userCredentials) => ({
	type: userTypes.EMAIL_SIGN_IN_START,
	payload: userCredentials,
});

export const signInSuccess = (user) => ({
	type: userTypes.SIGN_IN_SUCCESS,
	payload: user,
});

export const setCurrentUser = (user) => ({
	type: userTypes.SET_CURRENT_USER,
	payload: user,
});

export const resetAllAuthForms = () => ({
	type: userTypes.RESET_AUTH_FORMS,
});

// export const signInUser =
// 	({ email, password }) =>
// 	async (dispatch) => {

// 	};

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
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password,
			);
			await handleUserProfile(user, { displayName });
			dispatch({
				type: userTypes.SIGN_UP_SUCCESS,
				payload: true,
			});
		} catch (err) {
			return console.error(
				'error',
				err.code,
				'on form submission',
				err.message,
			);
		}
	};

export const resetPassword =
	({ email }) =>
	async (dispatch) => {
		const configReset = {
			url: 'http://localhost:3000/login',
		};

		try {
			await auth
				.sendPasswordResetEmail(email, configReset)

				.then(() => {
					dispatch({
						type: userTypes.RESET_PASSWORD_SUCCESS,
						payload: true,
					});
					console.log('Password Reset');
				})
				.catch((err) => {
					dispatch({
						type: userTypes.RESET_PASSWORD_ERROR,
						payload: err.message,
					});
					return console.error('Error on reset password submission', err);
				});
		} catch (err) {
			return console.error('Error on reset password submission', err);
		}
	};

export const signInWithGoogle = () => async (dispatch) => {
	try {
		await auth.signInWithPopup(GoogleProvider).then(() => {
			dispatch({
				type: userTypes.SIGN_IN_SUCCESS,
				payload: true,
			});
		});
	} catch (error) {
		console.error(error);
	}
};
