import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, resetAllAuthForms } from '../../redux/User/user.actions';
// component
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../../statics-components/Forms/FormInput/FormInput';
import Button from '../../statics-components/Button/Button';
// scss
import './signup.scss';

const mapState = ({ user }) => ({
	signUpSuccess: user.signUpSuccess,
	signUpError: user.signUpError,
});

const SignUp = (props) => {
	const dispatch = useDispatch();
	const initialState = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
		signUpError: [],
	};
	const { signUpSuccess, signUpError } = useSelector(mapState);
	const [userInformation, setUserInformation] = useState(initialState);
	const { displayName, email, password, confirmPassword } = userInformation;

	console.log(userInformation);

	useEffect(() => {
		if (signUpSuccess) {
			setUserInformation(initialState);
			dispatch(resetAllAuthForms);
			props.history.push('/');
		}
	}, [signUpSuccess]);

	useEffect(() => {
		if (Array.isArray(signUpError) && signUpError.length > 0) {
			setUserInformation({ signUpError });
		}
	}, [signUpError]);

	const handleChangeSetUserInformation = (e) => {
		setUserInformation({ ...userInformation, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		try {
			dispatch(
				signUpUser({
					displayName,
					email,
					password,
					confirmPassword,
				}),
			);
		} catch (err) {
			console.error(
				'userInfo = ',
				userInformation,
				'error',
				err.code,
				'on form submission',
				err.message,
			);
			setUserInformation({ ...userInformation, errors: [err.message] });
		}
	};

	return (
		<AuthWrapper headLine="Créer un compte">
			<form className="signUpEmailPw" onSubmit={handleFormSubmit}>
				{signUpError.length > 0 && (
					<ul className="errors">
						<h3>Erreur de formulaire</h3>
						{signUpError.map((err, index) => {
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
				<FormInput
					value={email}
					type="email"
					name="email"
					placeholder="Email"
					handleChange={(e) => handleChangeSetUserInformation(e)}
				/>
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
				<div className="wrap">
					<Button type="submit">Inscription</Button>
					<p className="policy">
						By creating an account you agree to our
						<Link to="/privacy"> Terms of Service and Privacy Policy</Link>
					</p>
				</div>
			</form>
		</AuthWrapper>
	);
};

export default withRouter(SignUp);
