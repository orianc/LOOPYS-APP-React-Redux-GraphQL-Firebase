import React, { useState } from 'react';
import './signup.scss';

import { Link } from 'react-router-dom';
import FormInput from '../../statics-components/Forms/FormInput/FormInput';
import Button from '../../statics-components/Button/Button';

const SignUp = (props) => {
	const [userInformations, setUserInformations] = useState({
		displayName: 'Test',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { displayName, email, password, confirmPassword } = userInformations;
	return (
		<div className="sign-up">
			<div className="wrap">
				<h2>Créer un compte</h2>
			</div>
			<div className="row">
				<form>
					<FormInput type="text" name={displayName} placeholder="Nom Prénom" />
					<FormInput type="email" name={email} placeholder="Email" />
					<FormInput type="password" name={password} placeholder="Password" />
					<FormInput type="password" name={confirmPassword} placeholder="Confirm password" />
				</form>
				<Button>Sign up</Button>
				<p className="policy">
					By creating an account you agree to our
					<Link to="/terms-page"> Terms of Service and Privacy Policy</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
