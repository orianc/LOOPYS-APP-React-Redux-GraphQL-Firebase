import React from 'react';
import './header.scss';

import Logo from '../../statics-components/Logo/Logo';

const Header = (props) => {
	return (
		<header className="header">
			<div className="wrap">
				<Logo />
			</div>
		</header>
	);
};

export default Header;
