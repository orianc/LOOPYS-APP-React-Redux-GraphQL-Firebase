import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
	return (
		<div className="App">
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<MainLayout>
							<Homepage />
						</MainLayout>
					)}
				/>
				<Route
					exact
					path="/login"
					render={() => (
						<FeatureLayout featureName="Connexion">
							<Login />
						</FeatureLayout>
					)}
				/>
				<Route
					path="/registration"
					render={() => (
						<MainLayout>
							<Registration />
						</MainLayout>
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
