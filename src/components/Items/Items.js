import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsStart } from '../../redux/Items/items.actions';
import ItemCard from '../ItemCard/ItemCard';
import './items.scss';

const mapState = ({ items }) => ({
	itemsData: items.items,
});

const Items = (props) => {
	const dispatch = useDispatch();
	const { itemsData } = useSelector(mapState);
	console.log(itemsData);

	useEffect(() => {
		dispatch(fetchItemsStart());
	}, []);
	// empty array is to only run on the first time
	if (!Array.isArray(itemsData)) return null;
	if (itemsData.length < 1) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}
	return (
		<div>
			<div className="itemsWrapper">
				{itemsData.length > 0 ? (
					itemsData.map((item, pos) => (
						<>{item.verified && <ItemCard item={item} index={pos} />}</>
					))
				) : (
					<p>Loading..</p>
				)}
			</div>
		</div>
	);
};

export default Items;
