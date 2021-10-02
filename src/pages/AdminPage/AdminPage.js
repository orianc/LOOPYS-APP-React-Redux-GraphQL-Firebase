import React, { useEffect, useState } from 'react';
import './adminpage.scss';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase/utils';

const mapState = ({ items }) => ({
	items: items.items,
});

const AdminPage = (props) => {
	const { items } = useSelector(mapState);

	const [usersList, setUsersList] = useState([]);
	const [itemsToValidate, setItemsToValidate] = useState(
		items.map((item) => !item.verified && item),
	);
	const [itemsValid, setItemsValid] = useState(
		items.map((item) => item.verified && item),
	);

	useEffect(() => {
		const getAllUsers = async () => {
			const Ref = await firestore.collection('/users').get();
			const docs = Ref.docs;
			const data = [docs.map((doc) => doc.data())];
			return data;
		};
		getAllUsers().then((res) => setUsersList(res[0]));
		setItemsToValidate(items.map((item) => !item.verified && item));
		setItemsValid(items.map((item) => item.verified && item));
	}, [items]);

	console.log(itemsToValidate);

	return (
		<div>
			<h1>Admin page</h1>
			{itemsValid.length > 0 ? (
				<DashboardCard
					titleCard="Tous les items"
					content={itemsValid}
				></DashboardCard>
			) : null}

			{itemsToValidate.length > 0 ? (
				<DashboardCard
					titleCard="Items en attente de validation"
					content={itemsToValidate}
				></DashboardCard>
			) : null}

			{usersList.length > 0 ? (
				<DashboardCard
					titleCard="Liste des membres"
					content={usersList}
				></DashboardCard>
			) : null}
		</div>
	);
};

export default AdminPage;
