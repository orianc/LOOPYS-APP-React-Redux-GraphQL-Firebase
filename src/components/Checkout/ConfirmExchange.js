import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../statics-components/Button/Button';
const ConfirmExchange = ({ valid, cancel, display, children, headLine }) => {
	// const [isConfirm, SetIsConfirm] = useState('waitAsk');

	return (
		<div style={{ display: display }} className="askConfirm">
			<h3>{headLine}</h3>
			<p className="disclaimer">{children}</p>
			<div className="chose">
				<Button onClick={valid}>Oui</Button>
				<Button onClick={cancel}>Non</Button>
			</div>
		</div>
	);
};

export default ConfirmExchange;
