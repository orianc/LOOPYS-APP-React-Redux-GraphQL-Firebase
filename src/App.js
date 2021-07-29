import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { auth } from './firebase/utils';
// layout
import MainLayout from './layout/MainLayout';
import FeatureLayout from './layout/FeatureLayout';

// pages
import Homepage from './pages/HomePage/HomePage';
import Registration from './pages/RegistrationPage/RegistrationPage';
import Login from './pages/LoginPage/LoginPage';
import NewAds from './pages/NewAdsPage/NewAdsPage';
import './default.scss';

function App() {
	const [currentLogged, setCurrentLogged] = useState(null);
	console.log(currentLogged);
	const authListener = async () => {
		try {
			await auth.onAuthStateChanged((userAuth) => {
				if (!userAuth) {
					console.log('nop user');
					return setCurrentLogged(null);
				}
				console.log('yep user');
				setCurrentLogged(userAuth);
			});
		} catch (error) {
			console.error('Error on authListener()', error);
		}
	};

	useEffect(() => {
		authListener();
	}, []);

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
							<FeatureLayout featureName="Connexion">
								<Login />
							</FeatureLayout>
						)
					}
				/>
				<Route
					path="/registration"
					render={() => (
						<FeatureLayout featureName="S'inscrire">
							<Registration />
						</FeatureLayout>
					)}
				/>

				<Route
					path="/new-ads"
					render={() => (
						<FeatureLayout featureName="New Ads">
							<NewAds />
						</FeatureLayout>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
