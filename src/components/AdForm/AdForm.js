import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
// redux
import { addItemStart } from '../../redux/Items/items.actions';
import { useDispatch, useSelector } from 'react-redux';
// component
import FormInput from '../../statics-components/Forms/FormInput/FormInput';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../../statics-components/Button/Button';
import Alert from '../Alert/Alert';
// assets and style
import SpinMoneyTitle from '../../assets/spin-money-title.svg';
import './adform.scss';

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const AdForm = (props) => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector(mapState);
	const history = useHistory();
	const timestamp = new Date();
	const initialState = {
		id: Math.round(Math.random() * 10000000000),
		name: '',
		photos: [],
		resume: '',
		send: false,
		withdrawal: false,
		loopysValue: 0,
		rule1: false,
		rule2: false,
		verified: false,
		authorId: currentUser.id,
		createAt: timestamp,
		state: 'open',
		keyWords: [],
	};
	// state : open, pending, close
	const [Item, setItem] = useState(initialState);
	const [charactCount, SetcharactCount] = useState(0);
	const [displayAlert, setDisplayAlert] = useState('none');

	const handleChange = (e) => {
		setItem({ ...Item, [e.target.name]: e.target.value });
	};

	const checkIt = (e) => {
		const targetField = e.target.name;
		setItem({ ...Item, [targetField]: !Item[targetField] });
	};

	const maxFile = () => {
		if (Item.photos.length > 5) {
			return true;
		}
		return false;
	};

	const resetForm = () => {
		setItem(initialState);
	};

	const handleSubmit = async (e) => {
		if (Item.send || Item.withdrawal) {
			Item.keyWords = Item.name.toLowerCase().split(' ');

			e.preventDefault();
			await dispatch(addItemStart(Item));
			resetForm();
			return history.push('/search');
		}
		await setDisplayAlert('block');
		return history.push('/new-ads');
	};

	// console.log(Item);
	return (
		<AuthWrapper headLine="Publier une annonce">
			<div style={{ display: displayAlert }}>
				<Alert headLine={'Oups...'} state={'error'}>
					{' '}
					Vous devez choisir au moins une méthode de délivrance...{' '}
				</Alert>
			</div>
			<form className="adForm" onSubmit={handleSubmit}>
				<FormInput
					onChange={(e) => handleChange(e)}
					autoFocus
					name="name"
					maxLength="60"
					placeholder="Nom de l'item"
					type="text"
					required
				/>
				<FormInput
					onChange={(e) => setItem({ ...Item, photos: e.target.files })}
					name="photos"
					type="file"
					style={{ color: maxFile() ? 'crimson' : null }}
					multiple
					capture
					accept="image/*"
				/>
				{maxFile() && (
					<span
						style={{ fontSize: '0.8rem', alignSelf: 'end', color: 'crimson' }}
					>
						Maximum de photos : 5
					</span>
				)}
				<div className="textAreaWrap">
					<textarea
						maxLength="1000"
						name="resume"
						placeholder="Description"
						type="textarea"
						onChange={(e) => {
							SetcharactCount(e.target.maxLength - e.target.value.length);
							handleChange(e);
						}}
					/>
					{charactCount !== 0 ? (
						<span
							className="charactCounter"
							style={{
								color: charactCount > 200 ? 'green' : 'crimson',
							}}
						>
							{charactCount}
						</span>
					) : null}
				</div>
				<div className="checkboxWrap">
					<FormInput
						onChange={(e) => checkIt(e)}
						type="checkbox"
						name="send"
						label="Envois"
					/>
					<FormInput
						onChange={(e) => checkIt(e)}
						type="checkbox"
						name="withdrawal"
						label="Retrait"
						style={{ justifyContent: 'right' }}
					/>
				</div>
				<FormInput
					onChange={(e) => handleChange(e)}
					placeholder="ex : 200"
					name="loopysValue"
					type="number"
					otherClass="loopysValue"
					required
				>
					<img src={SpinMoneyTitle} alt="" style={{ height: 35 }} />
				</FormInput>
				<FormInput
					otherClass="rules"
					placeholder="Loopys"
					type="radio"
					name="rule1"
					onChange={(e) => checkIt(e)}
					required
				>
					<p>
						J'accepte les <Link to="/privacy">Conditions de publication</Link> *
					</p>
				</FormInput>
				<FormInput
					otherClass="rules"
					required
					onChange={(e) => checkIt(e)}
					name="rule2"
					placeholder="Loopys"
					type="radio"
				>
					<p>Je certifie qu'il n'y a aucun contenu illégal ou inapproprié *</p>
				</FormInput>

				<Button type="submit">Publication</Button>
				<p className="policy">
					Votre publication serra vérifiée et validée par un administrateur
					avant d'être visible.
				</p>
			</form>
		</AuthWrapper>
	);
};

export default AdForm;
