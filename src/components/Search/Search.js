import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsStart } from '../../redux/Items/items.actions';
import './search.scss';

import FormInput from '../../statics-components/Forms/FormInput/FormInput';
const mapState = ({ items }) => ({
	items: items.items,
});

const Search = (props) => {
	const { items } = useSelector(mapState);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchItemsStart());
	}, []);

	if (!Array.isArray(items)) return null;
	if (items.length < 1) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}
	return (
		<div>
			<h1>Search Component</h1>
			<FormInput />
			{items.length > 0 &&
				items.map((item, index) => <p key={index}> {item.name} </p>)}
		</div>
	);
};

export default Search;
