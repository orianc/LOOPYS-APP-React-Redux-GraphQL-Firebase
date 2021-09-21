import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
	emailSignInStart,
	googleSignInStart,
} from '../../redux/User/user.actions';

// components
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormButtonTier from '../../statics-components/Forms/FormButtonTier/FormButtonTier';
import GoogleIcon from './../../assets/google-icon.svg';
import FormInput from './../../statics-components/Forms/FormInput/FormInput';
import Button from './../../statics-components/Button/Button';

// scss
import './signIn.scss';

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
	userError: user.userError,
});

const SignIn = (props) => {
	const initialState = {
		email: '',
		password: '',
		errors: [],
	};

	const dispatch = useDispatch();
	const history = useHistory();
	const { currentUser, userError } = useSelector(mapState);

	const [userLogin, setUserLogin] = useState(initialState);
	const { email, password } = userLogin;

	useEffect(() => {
		if (currentUser) {
			console.log(currentUser);
			history.push('/');
		}
	}, [currentUser]);

	const handleChange = (e) => {
		setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
	};

	const handleGooogleSignIn = () => {
		dispatch(googleSignInStart());
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			dispatch(emailSignInStart({ email, password }));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<AuthWrapper headLine="Connexion">
			<form onSubmit={(e) => handleSubmit(e)} className="signIn">
				<div className="emailPwSignIn">
					{userError.length > 0 && (
						<ul className="errors">
							<h3>Erreur de formulaire</h3>
							{userError.map((err, index) => {
								return <li key={index}>{err}</li>;
							})}
						</ul>
					)}
					<FormInput
						placeholder="Email"
						type="email"
						name="email"
						value={email}
						onChange={(e) => handleChange(e)}
					/>
					<FormInput
						placeholder="Mot de passe"
						type="password"
						name="password"
						value={password}
						onChange={(e) => handleChange(e)}
					/>
					<Button type="submit">Connexion</Button>
					<p className="pwRecovery">
						<Link to="/recovery">Mot de passe oublié ?</Link>
					</p>
				</div>
				<div className="separator"></div>
			</form>
			<div className="socialSignin">
				<div className="">
					<FormButtonTier onClick={handleGooogleSignIn} icon={GoogleIcon}>
						Se connecter avec Google
					</FormButtonTier>
				</div>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;
