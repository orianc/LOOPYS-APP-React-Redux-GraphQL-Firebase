import React, { Component } from 'react';

import Button from '../../statics-components/Forms/Button/Button';
import './signIn.scss';
import GoogleIcon from './../../assets/google-icon.svg';
import { signInWithGoogle } from '../../firebase/utils';

class SignIn extends Component {
	handleSubmit = async (e) => {
		e.preventDefault();
	};

	render() {
		return (
			<div className="sign-in">
				<div className="wrap">
					<h2>Authentification</h2>
				</div>

				<div>
					<form onSubmit={this.handleSubmit} className="formWrap">
						<div className="socialSignin">
							<div className="row">
								<Button onClick={signInWithGoogle} icon={GoogleIcon}>
									Se connecter avec Google
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SignIn;
