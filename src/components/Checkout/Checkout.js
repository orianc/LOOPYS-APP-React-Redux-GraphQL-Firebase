import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemStart } from '../../redux/Items/items.actions';
import { fetchItemsStart } from '../../redux/Items/items.actions';
import { removeExchangeItem } from '../../redux/Exchange/exchange.actions';
import SpinMoney from './../../assets/spin-money.svg';
import Button from './../../statics-components/Button/Button';
import './checkout.scss';

const mapState = ({ items, exchange, user }) => ({
	myItems: items.items.data,
	currentUser: user.currentUser,
	currentExchange: exchange.exchangeItems,
});

const Checkout = ({}) => {
	const { currentExchange, myItems, currentUser } = useSelector(mapState);
	const dispatch = useDispatch();

	const handleRemoveItem = (itemId) => {
		dispatch(removeExchangeItem(itemId));
		dispatch(fetchItemsStart());
	};

	const handleDeleteItem = (itemId) => {
		dispatch(deleteItemStart(itemId));
	};
	return (
		<div className="checkout">
			{currentExchange.length > 0 && <h1>Je demande</h1>}
			{currentExchange.length > 0 &&
				currentExchange.map((item, pos) => (
					<div className="exchangeItemLine" key={pos}>
						<div>
							<h3 className="nameItem">{item.name}</h3>
							<img
								src={
									'https://www.gaiacreators.fr/wp-content/uploads/2018/02/GWNH0172-2-1.png'
								}
								height={50}
								alt="itemImage"
							/>
						</div>
						{/* <p className="authorItem">{item.authorId} </p> */}
						<div>
							{item.send && <p className="retraitItem">Par envois</p>}
							{item.withdrawal && <p className="retraitItem">A retirer</p>}
						</div>
						<p className="valueItem">
							{item.loopysValue} <img src={SpinMoney} alt="icon" height={20} />
						</p>
						<div className="actions">
							{item.state === 'open' ? (
								<Button>Confirmer</Button>
							) : item.state === 'asked' ? (
								<Button onClick={() => handleRemoveItem(item.documentId)}>
									Annuler
								</Button>
							) : null}
						</div>
					</div>
				))}
			{myItems && myItems.length > 0 && <h1>Je propose</h1>}
			{myItems &&
				myItems.length > 0 &&
				myItems.map((item, pos) => {
					if (item.authorId === currentUser.id) {
						return (
							<div className="exchangeItemLine" key={pos}>
								<div className="itemPresent">
									<h3 className="nameItem">{item.name}</h3>

									<img
										src={
											'https://www.gaiacreators.fr/wp-content/uploads/2018/02/GWNH0172-2-1.png'
										}
										height={50}
										alt="itemImage"
									/>
								</div>
								{/* <p className="authorItem">{item.authorId} </p> */}
								<div>
									{item.send && <p className="retraitItem">Par envois</p>}
									{item.withdrawal && <p className="retraitItem">A retirer</p>}
								</div>
								<p className="valueItem">
									{item.loopysValue}{' '}
									<img src={SpinMoney} alt="icon" height={20} />
								</p>

								<div className="actions">
									{item.askedBy && (
										<div className="someoneAsked">
											<span>{item.askedBy.askerName} demande cet item</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												color="green"
												fill="currentColor"
												className="bi bi-check-circle-fill"
												viewBox="0 0 16 16"
											>
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
											</svg>
										</div>
									)}
									{currentUser.id === item.authorId && (
										<span onClick={() => handleDeleteItem(item.documentId)}>
											{' '}
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
									)}
								</div>
							</div>
						);
					}
				})}
		</div>
	);
};

export default Checkout;
