import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuthorName } from '../ItemCard/ItemCardUtils';
import FormInput from './../../statics-components/Forms/FormInput/FormInput';
import Button from './../../statics-components/Button/Button';
import spinMoney from './../../assets/spin-money.svg';
import './profilecard.scss';
import { updateProfile } from './profile.utils';
import ItemCard from '../ItemCard/ItemCard';
const mapState = ({ user, items }) => ({
	currentUser: user.currentUser,
	items: items.items.data,
});

const ProfileCard = ({ userID }) => {
	const { currentUser, items } = useSelector(mapState);
	const [profile, setProfile] = useState({});
	const { tel, loopys } = profile;
	const [userAccount, setUserAccount] = useState(currentUser);
	const [userItems, setUserItems] = useState({});

	useEffect(() => {
		if (userID) {
			getAuthorName(userID, setProfile);
		}
	}, []);

	useEffect(() => {
		var myItems = items.filter((item) => item.authorId === userID);
		console.log(myItems);
		return setUserItems(myItems);
	}, [profile, items]);

	console.log('profile', profile);
	console.log('myItems', userItems);

	const handleChange = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};
	// make an edit service
	const handleUpdate = (userAccount) => {
		updateProfile(userAccount);
	};

	console.log('userID', userID);
	return (
		<>
			{!profile.displayName && <p>loading...</p>}
			{profile && (
				<div className="profileCard">
					<h1>{profile.displayName}</h1>
					{profile.id === currentUser.id && (
						<span className="loopysCount">
							{loopys ? loopys : 0}
							<img src={spinMoney} alt="loopys" height={20} />
						</span>
					)}
					<div className="wrapper">
						{userItems && userItems.length > 0 && (
							<h2>
								{profile.id === currentUser.id && 'Je '}
								propose
							</h2>
						)}
						<div className="itemsWrapper">
							{userItems &&
								userItems.length > 0 &&
								userItems.map((item, pos) => (
									<ItemCard item={item} index={pos} />
								))}
						</div>
					</div>

					<div className="wrapper">
						<div className="informationAccount">
							{profile.id === currentUser.id && (
								<div className="line">
									<label>Téléphone :</label>
									<FormInput
										type="number"
										onChange={(e) => handleChange(e)}
										placeholder={tel}
										name="tel"
									/>
									<Button onClick={() => handleUpdate(userAccount)}>
										Update
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfileCard;
