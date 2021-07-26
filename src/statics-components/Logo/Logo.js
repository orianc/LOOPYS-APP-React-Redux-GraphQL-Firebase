import React from 'react';
import './logo.scss';

import Spin from '../../assets/spin.svg';

const Logo = (props) => {
	return (
		<div className="logo">
			<img src={Spin} alt="logo-spin" height="28px" />
			<h2 className="logo-text">Loopys</h2>
		</div>
	);
};

export default Logo;
