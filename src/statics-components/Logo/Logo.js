import React from 'react';
import './logo.scss';

import Spin from '../../assets/spin.svg';

const Logo = ({ logoSize = '28px', fontSize = '' }) => {
	return (
		<div className="logo">
			<img src={Spin} alt="logo-spin" height={logoSize} />
			<h2 className="logo-text" style={{ fontSize: fontSize }}>
				Loopys
			</h2>
		</div>
	);
};

export default Logo;
