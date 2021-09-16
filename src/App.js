// react & react-router-dom
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// firebase
// redux
import { useDispatch } from 'react-redux';
import { checkUserSession } from './redux/User/user.actions';

// hoc
import WithAuth from './hoc/withAuth';

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
import DashboardPage from './pages/DashboardPage/DashboardPage';

const App = (props) => {
	// console.log('props App : ', props);

	// --- destructuring 'store' from Redux Provider
	const dispatch = useDispatch();

	// ----------- Loop instruction on app initialization.
	useEffect(() => {
		dispatch(checkUserSession());
	}, []);

	// ----------- Routing define with layout and page associate.
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
						<FeatureLayout featureName="Authentification">
							<AuthPage />
						</FeatureLayout>
					)}
				/>
				<Route
					path="/dashboard"
					render={() => (
						<WithAuth>
							<FeatureLayout featureName="Dashboard">
								<DashboardPage />
							</FeatureLayout>
						</WithAuth>
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
};

export default App;
