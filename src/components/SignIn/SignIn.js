import React, { Component } from 'react';
import './signIn.scss';

import FormButtonTier from '../../statics-components/Forms/FormButtonTier/FormButtonTier';
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
					<h2>Se connecter</h2>
				</div>

				<div>
					<form onSubmit={this.handleSubmit} className="formWrap">
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
	}
}

export default SignIn;
