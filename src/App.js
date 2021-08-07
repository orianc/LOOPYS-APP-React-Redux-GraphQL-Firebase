import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { auth, handleUserProfile } from './firebase/utils';
// layout
import MainLayout from './layout/MainLayout';
import FeatureLayout from './layout/FeatureLayout';
import './default.scss';

// pages
import Homepage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import NewAds from './pages/NewAdsPage/NewAdsPage';
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';
import RecoveryPage from './pages/Recovery/RecoveryPage copy';

function App() {
	// ----------- Check if someone is logged.
	const [currentLogged, setCurrentLogged] = useState(null);
	/**
	 * Check if someone is logged and set currentLogged state.
	 * @todo You have to initialize a useState hook before like this :
	 * @example const [currentLogged, setCurrentLogged] = useState(null);
	 *
	 */
	const authListener = () => {
		auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot((snapshot) => {
					setCurrentLogged({
						id: snapshot.id,
						...snapshot.data,
					});
				});
				return console.log('User log');
			}
			setCurrentLogged(null);
			return console.log('No user logged in');
		});
	};

	// ----------- Loop instruction on app initialization.
	useEffect(() => {
		authListener();
	}, []);

	// ----------- Routing define with layout and page associate.
	return (
		<div className="App">
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<MainLayout currentUser={currentLogged}>
							<Homepage />
						</MainLayout>
					)}
				/>
				<Route
					exact
					path="/login"
					render={() =>
						currentLogged ? (
							<Redirect to="/" />
						) : (
							<FeatureLayout featureName="Authentification">
								<AuthPage />
							</FeatureLayout>
						)
					}
				/>

				<Route
					path="/new-ads"
					render={() => (
						<FeatureLayout featureName="New Ads">
							<NewAds />
						</FeatureLayout>
					)}
				/>

				<Route
					path="/recovery"
					render={() => (
						<FeatureLayout featureName="Récupération de mot de passe">
							<RecoveryPage />
						</FeatureLayout>
					)}
				/>

				<Route
					path="/privacy"
					render={() => (
						<FeatureLayout featureName="Terms of Services and Privacy">
							<PrivacyPage />
						</FeatureLayout>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
