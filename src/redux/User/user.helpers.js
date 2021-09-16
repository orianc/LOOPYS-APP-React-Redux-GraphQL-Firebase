import { auth } from '../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
	const configReset = {
		url: 'http://localhost:3000/login',
	};
	return new Promise((resolve, reject) => {
		auth
			.sendPasswordResetEmail(email, configReset)
			.then(() => {
				resolve();
			})
			.catch(() => {
				const err = ['Email not found'];
				console.error('Error on reset password submission', err);
				reject(err);
			});
	});
};
