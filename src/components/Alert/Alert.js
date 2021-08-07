import React from 'react';
import './alert.scss';

const Alert = ({ headLine, children, state }) => {
	return (
		<>
			{state && (
				<div className={state}>
					<h3> {headLine} </h3>
					<p>{children}</p>
				</div>
			)}
		</>
	);
};

export default Alert;
