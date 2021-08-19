import React, { useState } from 'react';
import './signIn.scss';

import { Link, withRouter } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormButtonTier from '../../statics-components/Forms/FormButtonTier/FormButtonTier';
import GoogleIcon from './../../assets/google-icon.svg';
import { signInWithGoogle, auth } from '../../firebase/utils';
import FormInput from './../../statics-components/Forms/FormInput/FormInput';
import Button from './../../statics-components/Button/Button';

const initialState = {
	email: '',
	password: '',
	errors: [],
};

const SignIn = (props) => {
	const [userLogin, setUserLogin] = useState(initialState);
	const { email, password, errors } = userLogin;

	const handleChange = (e) => {
		setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setUserLogin(initialState);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			resetForm();
			props.history.push('/');
		} catch (err) {
			console.error('Error on submit login form', err);
			setUserLogin({ ...userLogin, errors: [err.message] });
		}
	};

	return (
		<AuthWrapper headLine="Connexion">
			<form onSubmit={(e) => handleSubmit(e)} className="signIn">
				<div className="emailPwSignIn">
					{errors.length > 0 && (
						<ul className="errors">
							<h3>Erreur de formulaire</h3>
							{errors.map((err, index) => {
								return <li key={index}>{err}</li>;
							})}
						</ul>
					)}
					<FormInput placeholder="Email" type="email" name="email" value={email} onChange={(e) => handleChange(e)} />
					<FormInput placeholder="Mot de passe" type="password" name="password" value={password} onChange={(e) => handleChange(e)} />
					<Button type="submit">Connexion</Button>
					<p className="pwRecovery">
						<Link to="/recovery">Mot de passe oublié ?</Link>
					</p>
				</div>
				<div className="separator"></div>

				<div className="socialSignin">
					<div className="">
						<FormButtonTier onClick={signInWithGoogle} icon={GoogleIcon}>
							Se connecter avec Google
						</FormButtonTier>
					</div>
				</div>
			</form>
		</AuthWrapper>
	);
};

export default withRouter(SignIn);
