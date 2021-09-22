import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// component
import FormInput from '../../statics-components/Forms/FormInput/FormInput';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../../statics-components/Button/Button';

import SpinMoneyTitle from '../../assets/spin-money-title.svg';
import './adform.scss';

const initialState = {
	name: '',
	photos: [],
	resume: '',
	send: false,
	withdrawal: false,
	loopysValue: 0,
	rule1: false,
	rule2: false,
};

const AdForm = (props) => {
	const [Item, setItem] = useState(initialState);
	const [charactCount, SetcharactCount] = useState(0);

	const handleChange = (e) => {
		setItem({ ...Item, [e.target.name]: e.target.value });
	};

	const checked = (e) => {
		console.log(Item.[e.target.name]);
		setItem({ ...Item, [e.target.name]: !Item.[e.target.name] });
	};

  const maxFile = ()=>{
    if (Item.photos.length > 5) {
      return true
    }
    return false
  }
	console.log(Item);
	return (
		<AuthWrapper headLine="Publier une annonce">
			<form className="adForm">
				<FormInput
					onChange={(e) => handleChange(e)}
					autofocus
					name="name"
					maxLength="60"
					placeholder="Nom de l'item"
					type="text"
					required
				/>
				<FormInput
					onChange={(e) => setItem({...Item, photos: e.target.files})}
					name="photos"
					type="file"
          style={{color:(maxFile() ? 'crimson' : null)}}
					multiple
					capture
					accept="image/*"
				/>
        {maxFile() &&
        <span style={{fontSize: '0.8rem', alignSelf:'end', color:'crimson'}}>Maximum de photos : 5</span>
        }
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
						onChange={(e) => checked(e)}
						type="checkbox"
						name="send"
						label="Envois"
					/>
					<FormInput
						onChange={(e) => checked(e)}
						type="checkbox"
						name="withdrawal"
						label="Retrait"
						style={{ justifyContent: 'right' }}
					/>
				</div>
				<FormInput
					onChange={(e) => handleChange(e)}
					placeholder="ex : 200"
					type="number"
					otherClass="loopysValue"
				>
					<img src={SpinMoneyTitle} alt='' style={{ height: 35 }} />
				</FormInput>
				<FormInput
					otherClass="rules"
					placeholder="Loopys"
					type="radio"
					name="rule1"
					onChange={(e) => checked(e)}
					required
				>
					<p>
						J'accepte les <Link to="/privacy">Conditions de publication</Link> *
					</p>
				</FormInput>
				<FormInput
					otherClass="rules"
					required
					onChange={(e) => checked(e)}
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
