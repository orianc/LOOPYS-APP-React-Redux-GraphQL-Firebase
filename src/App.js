import React from 'react';
import { Route, Switch } from 'react-router-dom';
// layout
import MainLayout from './layout/MainLayout';
import FeatureLayout from './layout/FeatureLayout';

// pages
import Homepage from './pages/Homepage/Hompage';
import Registration from './pages/Registration/Registration';
import NewAds from './pages/NewAds/NewAds';
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
