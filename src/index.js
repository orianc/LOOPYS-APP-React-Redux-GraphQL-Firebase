// react
import React from 'react';
import ReactDOM from 'react-dom';
// router-dom
import { BrowserRouter } from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
import store from './redux/createStore';
// component
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
