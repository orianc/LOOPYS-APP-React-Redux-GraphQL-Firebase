import React from 'react';
import Header from './components/Header/Header';
import './default.scss';

import Hompage from './pages/Homepage/Hompage';

function App() {
	return (
		<div className="App">
			<Header />
			<div className="main">
				<Hompage />
			</div>
		</div>
	);
}

export default App;
