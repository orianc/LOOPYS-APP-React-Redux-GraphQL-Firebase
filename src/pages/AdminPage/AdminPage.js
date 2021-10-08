import React, { useEffect, useState } from 'react';
import './adminpage.scss';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import { useSelector, useDispatch } from 'react-redux';
import { firestore } from '../../firebase/utils';
import {
	fetchItemsStart,
	deleteItemStart,
} from '../../redux/Items/items.actions';
import Button from '../../statics-components/Button/Button';
import { validItem } from '../../redux/Items/items.actions';

const mapState = ({ items }) => ({
	itemsData: items.items,
});

const AdminPage = () => {
	const { itemsData } = useSelector(mapState);
	const { data, isLastPage } = itemsData;
	const dispatch = useDispatch();
	const [usersList, setUsersList] = useState([]);

	const handleLoadMore = () => {
		dispatch(
			fetchItemsStart({
				pageSize: null,
			}),
		);
	};

	const handleValidItem = (item) => {
		const { documentId } = item;
		dispatch(validItem(documentId));
		dispatch(fetchItemsStart({ askItemsToValid: true }));
	};

	useEffect(() => {
		dispatch(fetchItemsStart({ askItemsToValid: true }));

		const getAllUsers = async () => {
			const Ref = await firestore.collection('/users').get();
			const docs = Ref.docs;
			const data = [docs.map((doc) => doc.data())];
			return data;
		};
		getAllUsers().then((res) => setUsersList(res[0]));
	}, []);

	// console.log('itemsData', itemsData);
	console.log('data', data);

	return (
		<div className="adminPage">
			<div className="header">
				<h1>Admin page</h1>
				{data && data.length > 0 && (
					<span className="dataCounter">{data.length} items</span>
				)}
			</div>

			<div className="dashboardCard">
				<div className="infoCard">
					<div className="titleCard">
						<h3>Items en attente de validation</h3>
					</div>
				</div>
				{data &&
					data.map((item, index) => (
						<>
							{!item.verified && (
								<div className="item" key={index}>
									<p>{item.name}</p>
									<div className="callToActions">
										<Button
											style={{ marginLeft: 0, marginRight: 0 }}
											onClick={() => handleValidItem(item)}
										>
											Valider l'annonce
										</Button>
										<span
											onClick={() => dispatch(deleteItemStart(item.documentId))}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												color="#b40707"
												fill="currentColor"
												className="bi bi-trash-fill"
												viewBox="0 0 16 16"
											>
												<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
											</svg>
										</span>
									</div>
								</div>
							)}
						</>
					))}
			</div>
			<div className="dashboardCard">
				<div className="infoCard">
					<div className="titleCard">
						<h3>Tous les items</h3>
					</div>
					{!isLastPage && (
						<Button onClick={handleLoadMore}>Load All Items</Button>
					)}
				</div>
				{data &&
					data.map((item, index) => (
						<>
							{item.verified && (
								<div className="item" key={index}>
									<p>{item.name}</p>
									<span
										onClick={() => dispatch(deleteItemStart(item.documentId))}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											color="#b40707"
											fill="currentColor"
											className="bi bi-trash-fill"
											viewBox="0 0 16 16"
										>
											<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
										</svg>
									</span>
								</div>
							)}
						</>
					))}
			</div>

			<div>
				{usersList.length > 0 ? (
					<DashboardCard
						titleCard="Liste des membres"
						content={usersList}
					></DashboardCard>
				) : null}
			</div>
		</div>
	);
};

export default AdminPage;
