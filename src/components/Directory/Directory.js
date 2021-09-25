import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsStart } from '../../redux/Items/items.actions';
import ItemCard from '../ItemCard/ItemCard';
import './directory.scss';

const mapState = ({ items }) => ({
	itemsData: items.items,
});

const Directory = (props) => {
	const dispatch = useDispatch();
	const { itemsData } = useSelector(mapState);
	console.log(itemsData);

	useEffect(() => {
		dispatch(fetchItemsStart());
	}, []);
	// empty array is to only run on the first time

	return (
		<div>
			<div className="itemsWrapper">
				{itemsData.length > 0 &&
					itemsData.map((item, index) => (
						<ItemCard item={item} index={index} />
					))}
			</div>
		</div>
	);
};

export default Directory;
