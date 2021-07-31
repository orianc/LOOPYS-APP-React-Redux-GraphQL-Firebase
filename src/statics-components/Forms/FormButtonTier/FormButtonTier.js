import React from 'react';
import './formButtonTier.scss';

const FormButtonTier = ({ children, ...otherProps }) => {
	return (
		<button className="btn-tier" {...otherProps}>
			{otherProps.icon && <img src={otherProps.icon} />}
			{children}
		</button>
	);
};

export default FormButtonTier;
