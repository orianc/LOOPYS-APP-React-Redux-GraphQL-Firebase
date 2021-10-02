import React from 'react';
import './dashboardCard.scss';
import { useDispatch } from 'react-redux';
import { validItem } from '../../redux/Items/items.actions';
const DashboardCard = ({ titleCard, content, children }) => {
	const dispatch = useDispatch();

	const handleValidItem = (item) => {
		const { documentId } = item;
		// console.log('in handleValidItem', documentId);
		dispatch(validItem(documentId));
	};

	return (
		<div className="dashboardCard">
			<div className="infoCard">
				<h3>{titleCard}</h3>
				{content[0] && <span>{content.length}</span>}
			</div>
			{children}

			{content.length > 0
				? content.map((c, index) => (
						<>
							{(c.name || c.displayName) && (
								<div className="item" key={index}>
									<p>{c.name ? c.name : c.displayName}</p>
									{c.verified === false && (
										<button onClick={() => handleValidItem(c)}>
											Valider l'annonce
										</button>
									)}
								</div>
							)}
						</>
				  ))
				: null}
		</div>
	);
};

export default DashboardCard;
