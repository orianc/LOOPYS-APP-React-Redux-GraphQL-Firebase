import React, { useState } from 'react';
import './signIn.scss';

import FormButtonTier from '../../statics-components/Forms/FormButtonTier/FormButtonTier';
import GoogleIcon from './../../assets/google-icon.svg';
import { signInWithGoogle, auth } from '../../firebase/utils';
import FormInput from './../../statics-components/Forms/FormInput/FormInput';
import Button from './../../statics-components/Button/Button';
const SignIn = (props) => {
	const initialState = {
		email: '',
		password: '',
	};
	const [userLogin, setUserLogin] = useState(initialState);

	const handleSubmit = async (e) => {
		const { email, password } = userLogin;
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			setUserLogin(initialState);
		} catch (err) {
			console.error('Error on submit login form', err);
		}
	};

	const handleChange = (e) => {
		setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
	};

	const { email, password } = userLogin;
	return (
		<div className="sign-in">
			<div className="wrap">
				<h2>Se connecter</h2>
			</div>

			<div>
				<form onSubmit={(e) => handleSubmit(e)} className="formWrap">
					<div className="row emailPwSignIn">
						<FormInput placeholder="Email" type="email" name="email" value={email} onChange={(e) => handleChange(e)} />
						<FormInput placeholder="Mot de passe" type="password" name="password" value={password} onChange={(e) => handleChange(e)} />
						<Button type="submit">Connexion</Button>
					</div>
					<div className="separator"></div>

					<div className="socialSignin">
						<div className="row">
							<FormButtonTier onClick={signInWithGoogle} icon={GoogleIcon}>
								Se connecter avec Google
							</FormButtonTier>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
