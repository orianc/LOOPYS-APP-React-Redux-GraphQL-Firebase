import React, { useState, useEffect } from 'react';
// firebase
import { firestore } from '../../firebase/utils';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemStart } from '../../redux/Items/items.actions';
// component
import Button from '../../statics-components/Button/Button';
import SpinMoney from '../../assets/spin-money.svg';

import './itemcard.scss';

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const ItemCard = (props) => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector(mapState);
	const { item, index } = props;
	const [author, setAuthor] = useState('');
	const [displayResume, setDisplayResume] = useState(false);

	// console.log('author: ', author);

	const getAuthorName = async (authorId) => {
		var AuthorRef = firestore.doc(`users/${authorId}`);
		var snap = await AuthorRef.get();
		if (snap.exists) {
			return console.log(snap.data());
		}
	};

	useEffect(() => {
		setAuthor(getAuthorName(item.authorId));
	}, []);

	return (
		<>
			{item.documentId ? (
				<div className="itemCard" key={index}>
					<div style={{ marginBottom: 10 }}>
						<h3 className="itemName">{item.name}</h3>
						<div className="itemImage">
							<img
								src={
									'https://www.gaiacreators.fr/wp-content/uploads/2018/02/GWNH0172-2-1.png'
								}
								alt="item"
							/>
						</div>
						{/* <p>{item.createAt.toString()}</p> */}
						<div className="itemResume">
							<span onClick={() => setDisplayResume(!displayResume)}>
								{displayResume ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-chevron-compact-up"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-chevron-compact-down"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
										/>
									</svg>
								)}
							</span>
							{displayResume ? <p>{item.resume}</p> : null}
						</div>
						<div className="itemGlobalInfo">
							{item.send && (
								<div>
									<span>Par envois</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="green"
										class="bi bi-check-circle-fill"
										viewBox="0 0 16 16"
									>
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
									</svg>
								</div>
							)}
							{item.withdrawal && (
								<div>
									<span>Retrait sur place</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="green"
										class="bi bi-check-circle-fill"
										viewBox="0 0 16 16"
									>
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
									</svg>
								</div>
							)}
							<div className="price">
								<p>{item.loopysValue}</p>
								<img height="20px" src={SpinMoney} />
							</div>
						</div>
					</div>

					<div className="itemActions">
						<Button> See more </Button>

						{currentUser &&
						(currentUser.id === item.authorId ||
							currentUser.userRoles.includes('admin')) ? (
							<>
								<Button>edit</Button>

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
							</>
						) : null}
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default ItemCard;
