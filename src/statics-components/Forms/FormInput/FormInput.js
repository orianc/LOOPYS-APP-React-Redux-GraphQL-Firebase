import React from 'react';
import './formInput.scss';

const FormInput = ({
	children,
	handleChange,
	label,
	name,
	otherClass,
	...otherProps
}) => {
	return (
		<div className={`formRow ${otherClass ? otherClass : ''}`}>
			{label && <label htmlFor={name ? name : null}>{label}</label>}
			<input
				name={name ? name : null}
				className="formInput"
				onChange={handleChange}
				{...otherProps}
			/>
			{children}
		</div>
	);
};

export default FormInput;
