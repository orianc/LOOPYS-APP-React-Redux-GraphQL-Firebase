import { takeLatest, call, all, put } from '@redux-saga/core/effects';
import { auth, handleUserProfile } from '../../firebase/utils';
import { signInSuccess } from './user.actions';
import userTypes from './user.types';

export function* getSnapshotFromUserAuth(user) {
	try {
		const userRef = yield call(handleUserProfile, { userAuth: user });
		const snapshot = yield userRef.get();
		yield put(
			signInSuccess({
				id: snapshot.id,
				...snapshot.data,
			}),
		);
	} catch (err) {
		console.error(err);
	}
}

export function* emailSignIn({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (err) {
		console.error('Error on submit login form', err);
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}
export default function* userSagas() {
	yield all([call(onEmailSignInStart)]);
}
