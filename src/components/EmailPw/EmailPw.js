import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
	resetPasswordStart,
	resetUserState,
} from '../../redux/User/user.actions';

// components
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../../statics-components/Forms/FormInput/FormInput';
import Button from '../../statics-components/Button/Button';
import Alert from '../Alert/Alert';

// scss
import './emailPw.scss';

const mapState = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	userError: user.userError,
});

const EmailPw = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const initialState = {
		email: '',
		errors: [],
		reset: null,
	};
	const [userLogin, setUserLogin] = useState(initialState);
	const { email, errors, reset } = userLogin;
	const { resetPasswordSuccess, userError } = useSelector(mapState);
	// console.log(userLogin);

	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetUserState());
			setUserLogin({ ...userLogin, errors: [], reset: true });
			setTimeout(() => {
				history.push('/login');
			}, 3500);
		}
	}, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(userError) && userError.length > 0) {
			setUserLogin({
				...userLogin,
				errors: [userError],
				reset: false,
			});
		}
	}, [userError]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(resetPasswordStart({ email }));
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
						Mot de passe réinitialisé, merci de consulter vos mails pour
						terminer la démarche.
					</Alert>
				)}
				<FormInput
					placeholder="Email"
					type="email"
					name="email"
					value={email}
					onChange={(e) => handleChange(e)}
				/>
				<Button type="submit">Confirmer</Button>
			</form>
		</AuthWrapper>
	);
};

export default EmailPw;
