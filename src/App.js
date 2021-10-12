// react & react-router-dom
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// firebase
// redux
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from './redux/User/user.actions';

// hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
// layout
import MainLayout from './layout/MainLayout';
import FeatureLayout from './layout/FeatureLayout';
import './default.scss';
// pages
import Homepage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import NewAdsPage from './pages/NewAdsPage/NewAdsPage';
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';
import RecoveryPage from './pages/Recovery/RecoveryPage copy';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ExchangePage from './pages/ExchangePage/ExchangePage';
import AdminPage from './pages/AdminPage/AdminPage';
import SearchPage from './pages/SearchPage/SearchPage';
// components
import AdminToolBar from './components/AdminToolBar/AdminToolBar';
import ItemPage from './pages/ItemPage/ItemPage';
import { fetchItemsStart } from './redux/Items/items.actions';

const mapState = ({ items, user }) => ({
	item: items.item,
	currentUser: user.currentUser,
});

const App = (props) => {
	const dispatch = useDispatch();
	const { item, currentUser } = useSelector(mapState);

	useEffect(() => {
		dispatch(checkUserSession());
		dispatch(fetchItemsStart());
	}, []);

	return (
		<div className="App">
			<AdminToolBar />
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
						<MainLayout>
							<AuthPage />
						</MainLayout>
					)}
				/>
				<Route
					exact
					path="/search"
					render={() => (
						<MainLayout>
							<SearchPage />
						</MainLayout>
					)}
				/>
				<Route
					path="/search/:filterType"
					render={() => (
						<MainLayout>
							<SearchPage />
						</MainLayout>
					)}
				/>
				<Route
					path={'/item/:itemID'}
					render={() => (
						<FeatureLayout featureName={item.name ? item.name : 'Item'}>
							<ItemPage />
						</FeatureLayout>
					)}
				/>
				{/* <Route
					path="/dashboard"
					render={() => (
						<WithAuth>
							<FeatureLayout featureName="Mon profil">
								<ProfilePage />
							</FeatureLayout>
						</WithAuth>
					)}
				/> */}
				<Route
					path={'/profile/:userID'}
					render={() => (
						<FeatureLayout featureName={''}>
							<ProfilePage />
						</FeatureLayout>
					)}
				/>
				<Route
					path="/exchange"
					render={() => (
						<WithAuth>
							<FeatureLayout featureName="Ma boucle">
								<ExchangePage />
							</FeatureLayout>
						</WithAuth>
					)}
				/>
				<Route
					path="/new-ads"
					render={() => (
						<WithAuth>
							<FeatureLayout featureName="Ajouter une annonce">
								<NewAdsPage />
							</FeatureLayout>
						</WithAuth>
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
					path="/admin"
					render={() => (
						<WithAdminAuth>
							<FeatureLayout featureName="Admin Dashboard">
								<AdminPage />
							</FeatureLayout>
						</WithAdminAuth>
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
