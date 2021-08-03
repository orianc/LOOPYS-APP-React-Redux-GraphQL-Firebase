import React, { useState } from 'react';
import './signup.scss';

import { auth, handleUserProfile } from './../../firebase/utils';
import { Link } from 'react-router-dom';
import FormInput from '../../statics-components/Forms/FormInput/FormInput';
import Button from '../../statics-components/Button/Button';

const initialState = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
	errors: [],
};
const SignUp = (props) => {
	const [userInformation, setUserInformation] = useState(initialState);
	const { displayName, email, password, confirmPassword, errors } = userInformation;

	const handleChangeSetUserInformation = (e) => {
		setUserInformation({ ...userInformation, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			const err = ['Les mots de passe ne correspondent pas.'];
			return setUserInformation({ ...userInformation, errors: err });
		}
		setUserInformation({ ...userInformation, errors: [] });

		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			await handleUserProfile(user, { displayName });
			setUserInformation(initialState);
		} catch (err) {
			console.error('error', err.code, 'on form submission', err.message);
			setUserInformation({ ...userInformation, errors: [err.message] });
		}
	};

	console.log('user information : ', userInformation);

	return (
		<div className="sign-up">
			<div className="wrap">
				<h2>Créer un compte</h2>
			</div>
			<form className="row" onSubmit={handleFormSubmit}>
				{errors.length > 0 && (
					<ul className="errors">
						<h3>Erreur de formulaire</h3>
						{errors.map((err, index) => {
							return <li key={index}>{err}</li>;
						})}
					</ul>
				)}

				<FormInput
					type="text"
					name="displayName"
					value={displayName}
					placeholder="Nom Prénom"
					handleChange={(e) => handleChangeSetUserInformation(e)}
				/>
				<FormInput value={email} type="email" name="email" placeholder="Email" handleChange={(e) => handleChangeSetUserInformation(e)} />
				<FormInput
					type="password"
					name="password"
					value={password}
					placeholder="Mot de passe"
					handleChange={(e) => handleChangeSetUserInformation(e)}
				/>

				<FormInput
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					handleChange={(e) => handleChangeSetUserInformation(e)}
					placeholder="Confirmer mot de passe"
				/>
				<div className="row">
					<Button type="submit">Inscription</Button>
					<p className="policy">
						By creating an account you agree to our
						<Link to="/privacy"> Terms of Service and Privacy Policy</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
