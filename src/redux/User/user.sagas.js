import { takeLatest, call, all, put } from '@redux-saga/core/effects';
import {
	auth,
	handleUserProfile,
	getCurrentUser,
	GoogleProvider,
} from '../../firebase/utils';
import {
	signInSuccess,
	signOutUserSuccess,
	userError,
	resetPasswordSuccess,
} from './user.actions';
import userTypes from './user.types';
import { handleResetPasswordAPI } from './user.helpers';
/* 
Redux Saga work with ES6 generator function to listen and dispatch actions.
Execute actions on independent back side of the app.
**/

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
	try {
		const userRef = yield call(handleUserProfile, {
			userAuth: user,
			additionalData,
		});
		const snapshot = yield userRef.get();
		yield put(
			signInSuccess({
				id: snapshot.id,
				...snapshot.data(),
			}),
		);
	} catch (err) {
		yield put(userError(err.message));
		console.error(err);
	}
}

export function* emailSignIn({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		console.log('in saga, emailSignIn', user);
		yield getSnapshotFromUserAuth(user);
	} catch (err) {
		const error = [err.message];
		yield put(userError(error));
		console.error('Error on submit login form', error);
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;

		yield getSnapshotFromUserAuth(userAuth);
	} catch (err) {
		// console.error(err);
	}
}

export function* onCheckUserSession() {
	// listen first arg and execute second
	yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* signOutUser() {
	try {
		yield auth.signOut();
		yield put(signOutUserSuccess());
	} catch (err) {}
}

export function* onSignOutUserStart() {
	yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
	payload: { displayName, email, password, confirmPassword },
}) {
	if (password !== confirmPassword) {
		const err = ['Les mots de passe ne correspondent pas.'];
		console.error('in signUpUser saga', err);
		yield put(userError(err));
		return;
	}
	if (!email || !displayName || !password) {
		const err = ['Il manque un champs'];
		yield put(userError(err));
		return;
	}
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		const additionalData = { displayName };
		yield getSnapshotFromUserAuth(user, additionalData);
	} catch (err) {
		yield put(userError([err.message]));
		return console.error('error', err.code, 'on form submission', err.message);
	}
}

export function* onSignUpUserStart() {
	yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* GoogleSignIn() {
	try {
		const { user } = yield auth.signInWithPopup(GoogleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		console.error(error);
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, GoogleSignIn);
}

export function* resetPassword({ payload: { email } }) {
	try {
		yield call(handleResetPasswordAPI, email);
		yield put(resetPasswordSuccess());
	} catch (err) {
		yield put(userError(err));
	}
}

export function* onResetPasswordStart() {
	yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export default function* userSagas() {
	yield all([
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutUserStart),
		call(onSignUpUserStart),
		call(onResetPasswordStart),
		call(onGoogleSignInStart),
	]);
}
