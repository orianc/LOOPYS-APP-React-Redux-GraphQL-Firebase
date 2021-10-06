import React from 'react';
import './homepage.scss';
import Logo from '../../statics-components/Logo/Logo';
import { Link } from 'react-router-dom';
import Button from '../../statics-components/Button/Button';
import SpinMoney from '../../assets/spin-money.svg';
import { useSelector } from 'react-redux';

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const Homepage = (props) => {
	const { currentUser } = useSelector(mapState);
	return (
		<section className="homePage">
			<Logo logoSize="50px" fontSize="38px" />
			<h1>Bienvenue nouveau Looper !</h1>
			<p className="introExplain">
				Bienvenue dans la boucle !<br />
				Loopys est une application communautaire qui permet à ses utilisateurs
				d'échanger des biens sans utiliser d'argent, grace aux Loopys ! <br />
				<img
					src={SpinMoney}
					alt="loopys"
					height="20px"
					style={{ margin: '10px' }}
				/>{' '}
				<br />
				Quand un Looper souhaite votre bien et que l'échange s'effectue vous
				récupérer des Loopys qui vous permettront à votre tour de demander un
				bien qui vous interesse. <br />
				Plus vous donnez, plus vous recevez !
			</p>
			<h3>Prêt à rentrer dans la boucle des échanges ?</h3>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					width: '100%',
				}}
			>
				<Link to="/search">
					<Button>Entrer dans la boucle...</Button>
				</Link>

				{!currentUser && (
					<Link to="/login">
						<Button>Devenir un Looper...</Button>
					</Link>
				)}
			</div>
		</section>
	);
};

export default Homepage;
