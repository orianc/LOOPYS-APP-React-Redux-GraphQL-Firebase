import React from 'react';
import './dashboardCard.scss';
import { useDispatch } from 'react-redux';
import { validItem } from '../../redux/Items/items.actions';
import Button from '../../statics-components/Button/Button';
import { Link } from 'react-router-dom';
const DashboardCard = ({
	titleCard,
	content,
	children,
	actionClick,
	lengthItems,
}) => {
	const dispatch = useDispatch();

	const handleValidItem = (item) => {
		const { documentId } = item;
		// console.log('in handleValidItem', documentId);
		dispatch(validItem(documentId));
	};

	return (
		<div className="dashboardCard">
			<div className="infoCard">
				<div className="titleCard">
					<h3>{titleCard}</h3>
					{lengthItems && <span>{lengthItems}</span>}
				</div>
				{actionClick && <Button onClick={actionClick}>Load</Button>}
			</div>
			{children}

			{content.length > 0 && content[0] != null
				? content.map((c, index) => (
						<>
							{c.name || c.displayName ? (
								<div className="item" key={index}>
									<p>
										{c.name ? (
											c.name
										) : (
											<Link to={`/profile/${c.id}`}>{c.displayName}</Link>
										)}
									</p>
									<p>{c.userRoles && c.userRoles.map((role) => `${role} `)}</p>
									{c.verified === false && (
										<button onClick={() => handleValidItem(c)}>
											Valider l'annonce
										</button>
									)}
								</div>
							) : null}
						</>
				  ))
				: null}
		</div>
	);
};

export default DashboardCard;
