import React from 'react';
import Button from '../../statics-components/Button/Button';

const ConfirmExchange = ({ valid, cancel, display, children, headLine }) => {
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
