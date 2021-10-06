import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsStart } from '../../redux/Items/items.actions';
import ItemCard from '../ItemCard/ItemCard';
import SearchInput from '../Search/Search';
import './items.scss';

const mapState = ({ items }) => ({
	itemsData: items.items,
});

const Items = (props) => {
	const dispatch = useDispatch();
	const { itemsData } = useSelector(mapState);
	const history = useHistory();
	const { filterType } = useParams();
	const [oups, setOups] = useState(false);

	useEffect(() => {
		dispatch(fetchItemsStart({ filterType }));
	}, [filterType]);

	const handleFilters = async (e) => {
		e.preventDefault();
		const nextFilter = e.target.value.toLowerCase();
		history.push(`/search/${nextFilter}`);
	};

	if (!Array.isArray(itemsData)) return null;

	if (itemsData.length < 1) {
		setTimeout(() => {
			setOups(true);
		}, 3000);
		return (
			<div>
				<div className="itemsWrapper">
					<div className="itemsIntro">
						<h1>Retrouvez toutes la boucle ici !</h1>
					</div>
					<SearchInput handleChange={handleFilters} defaultValue={filterType} />
					<p>{!oups ? 'Loading...' : 'Oups... Aucun Loop à voir...'}</p>
				</div>
			</div>
		);
	}
	return (
		<div>
			<div className="itemsWrapper">
				<div className="itemsIntro">
					<h1>Retrouvez toutes la boucle ici !</h1>
				</div>
				<SearchInput handleChange={handleFilters} defaultValue={filterType} />

				{itemsData.map((item, pos) => (
					<>{item.verified && <ItemCard item={item} index={pos} />}</>
				))}
			</div>
		</div>
	);
};

export default Items;
