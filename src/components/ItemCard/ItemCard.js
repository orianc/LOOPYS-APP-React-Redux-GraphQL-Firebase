import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { firestore } from '../../firebase/utils';
import { deleteItemStart } from '../../redux/Items/items.actions';

import { Link } from 'react-router-dom';
import './itemcard.scss';
import { resolve } from 'path/posix';

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const ItemCard = (props) => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector(mapState);
	const { item, index } = props;
	const [author, setAuthor] = useState('');

	console.log('doc id ?  : ', item.documentId);

	const getAuthorName = (authorId) => {
		return firestore
			.doc(`users/${authorId}`)
			.get()
			.then((snap) => {
				var data = snap.data();
				console.log(data);
			});
	};

	useEffect(() => {
		setAuthor(getAuthorName(item.authorId));
	}, []);

	return (
		<>
			{item ? (
				<div className="itemCard" key={index}>
					<h3>name</h3>
					<h5>{item.name}</h5>

					<p>{item.createAt.toString()}</p>
					<p>{item.resume}</p>
					<p>{item.loopysValue}</p>
					{currentUser.id === item.authorId ? <button>edit</button> : null}
					{currentUser.id === item.authorId ? (
						<button onClick={() => dispatch(deleteItemStart(item.documentId))}>
							delete
						</button>
					) : null}

					<button> See more </button>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default ItemCard;
