import React from 'react';
import './button.scss';

const Button = ({ children, ...otherProps }) => {
	return (
		<button className="btn" {...otherProps}>
			{otherProps.icon && <img src={otherProps.icon} />}
			{children}
		</button>
	);
};

export default Button;
