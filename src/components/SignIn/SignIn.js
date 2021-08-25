import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

// firebase
import { signInWithGoogle } from '../../firebase/utils';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../redux/User/user.actions';

// components
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormButtonTier from '../../statics-components/Forms/FormButtonTier/FormButtonTier';
import GoogleIcon from './../../assets/google-icon.svg';
import FormInput from './../../statics-components/Forms/FormInput/FormInput';
import Button from './../../statics-components/Button/Button';

// scss
import './signIn.scss';

const mapState = ({ user }) => ({
	signInSuccess: user.signInSuccess,
});

const SignIn = (props) => {
	const initialState = {
		email: '',
		password: '',
		errors: [],
	};

	const dispatch = useDispatch();
	const { signInSuccess } = useSelector(mapState);

	const [userLogin, setUserLogin] = useState(initialState);
	const { email, password, errors } = userLogin;

	useEffect(() => {
		if (signInSuccess) {
			resetForm();
			props.history.push('/');
		}
	}, [signInSuccess]);

	const handleChange = (e) => {
		setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setUserLogin(initialState);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			dispatch(signInUser({ email, password }));
		} catch (err) {
			console.error(err);
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
