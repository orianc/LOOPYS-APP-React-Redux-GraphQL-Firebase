import React from 'react';
import './authpage.scss';

import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';

const AuthPage = (props) => {
	return (
		<div className="auth-page">
			<SignIn />
			<SignUp />
		</div>
	);
};

export default AuthPage;
