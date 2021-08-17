// react & react-router-dom
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// firebase
import { auth, handleUserProfile } from './firebase/utils';
// redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';
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

const mapStateToProps = ({ user }) => ({ currentUser: user.currentUser });
const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
function App(props) {
	// console.log('props App : ', props);

	// --- destructuring 'store' from Redux Provider
	const { setCurrentUser } = props;
	const { currentUser } = props;

	// --- old user state with useState from React
	// const [currentUser, setCurrentUser] = useState(null);

	/**
	 * Check if someone is logged and set currentLogged state.
	 */
	const authListener = () => {
		auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot((snapshot) => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data,
					});
				});
				return console.log('User log');
			}
			setCurrentUser(userAuth);
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
						<MainLayout>
							<Homepage />
						</MainLayout>
					)}
				/>
				<Route
					exact
					path="/login"
					render={() =>
						currentUser ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
