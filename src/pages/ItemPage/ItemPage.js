import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemStart, setItem } from '../../redux/Items/items.actions';

import ItemCard from '../../components/ItemCard/ItemCard';
import './itempage.scss';

const mapState = ({ items }) => ({
	item: items.item,
});

const ItemPage = ({}) => {
	const { item } = useSelector(mapState);
	const { itemID } = useParams();
	const dispatch = useDispatch();
	const displayItemPage = true;

	item.documentId = itemID;

	useEffect(() => {
		dispatch(fetchItemStart(itemID));
		return () => {
			dispatch(setItem({}));
		};
	}, []);

	return (
		<div className="itemDetail">
			{item.resume && <ItemCard item={item} displayItemPage />}
		</div>
	);
};

export default ItemPage;
