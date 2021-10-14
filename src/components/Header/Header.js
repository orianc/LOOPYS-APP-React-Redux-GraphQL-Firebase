// dependencies
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// redux
import { signOutUserStart } from '../../redux/User/user.actions';
// components
import Logo from '../../statics-components/Logo/Logo';
// style
import SpinMoney from './../../assets/spin-money.svg';
import './header.scss';

const mapState = ({ user, exchange }) => ({
	currentUser: user.currentUser,
	currentExchangeCount: exchange.exchangeItems,
});
const Header = (props) => {
	const dispatch = useDispatch();
	const { currentUser, currentExchangeCount } = useSelector(mapState);
	console.log(currentExchangeCount);
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		if (Array.isArray(currentExchangeCount)) {
			currentExchangeCount.map(
				(item) => item.state !== 'done' && setCounter(counter + 1),
			);
		}
		return () => {
			setCounter(0);
		};
	}, [currentExchangeCount]);

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	return (
		<header className="header">
			<div className="wrap">
				<Link to="/">
					<Logo />
				</Link>

				{currentUser && (
					<div className="callToActions">
						<Link to="/new-ads">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-plus-circle"
								viewBox="0 0 16 16"
							>
								<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
								<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
							</svg>
							<span>Ajouter une annonce</span>
						</Link>
						<Link to={`/profile/${currentUser.id}`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-person-fill"
								viewBox="0 0 16 16"
							>
								<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
							</svg>
							<span>Voir mon profil</span>
						</Link>
						<Link to="/exchange" className="exchange">
							{counter > 0 && <span className="exchangeCount">{counter}</span>}
							<img src={SpinMoney} alt="icon" height={20} />
							{/* <svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-bell-fill"
								viewBox="0 0 16 16"
							>
								<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
							</svg> */}
						</Link>

						<Link to="/search">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-search"
								viewBox="0 0 16 16"
							>
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
						</Link>
						<span className="btn-logout" onClick={() => signOut()}>
							LogOut
						</span>
					</div>
				)}
				{!currentUser && (
					<div className="callToActions">
						<Link to="/login" className="btn-register">
							Connexion
						</Link>
						<Link to="/search">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-search"
								viewBox="0 0 16 16"
							>
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
						</Link>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
