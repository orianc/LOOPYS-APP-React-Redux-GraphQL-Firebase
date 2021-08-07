import React, { useState } from 'react';
import './emailPw.scss';
import { withRouter } from 'react-router';

import { auth } from '../../firebase/utils';

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../../statics-components/Forms/FormInput/FormInput';
import Button from '../../statics-components/Button/Button';
import Alert from '../Alert/Alert';

const initialState = {
	email: '',
	errors: [],
	reset: null,
};

const EmailPw = (props) => {
	const [userLogin, setUserLogin] = useState(initialState);
	const { email, errors, reset } = userLogin;

	console.log(userLogin);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const configReset = {
				url: 'http://localhost:3000/login',
			};
			await auth.sendPasswordResetEmail(email, configReset).then(() => {
				console.log('Password Reset');
				setUserLogin({ ...userLogin, errors: [], reset: true });
				return setTimeout(() => {
					props.history.push('/login');
				}, '1000ms');
			});
		} catch (err) {
			setUserLogin({ ...userLogin, errors: [err.message], reset: false });
			return console.error('Error on reset password submission', err);
		}
	};

	const handleChange = (e) => {
		setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
	};

	return (
		<AuthWrapper headLine="Récupération de mot de passe">
			<form onSubmit={(e) => handleSubmit(e)}>
				{errors.length > 0 && (
					<Alert headLine="Erreur" state="error">
						{errors.map((err, index) => {
							return <li key={index}>{err}</li>;
						})}
					</Alert>
				)}

				{reset && (
					<Alert headLine="Reset success" state="success">
						Mot de passe réinitialisé, merci de consulter vos mails pour terminer la démarche.
					</Alert>
				)}
				<FormInput placeholder="Email" type="email" name="email" value={email} onChange={(e) => handleChange(e)} />
				<Button type="submit">Confirmer</Button>
			</form>
		</AuthWrapper>
	);
};

export default withRouter(EmailPw);
