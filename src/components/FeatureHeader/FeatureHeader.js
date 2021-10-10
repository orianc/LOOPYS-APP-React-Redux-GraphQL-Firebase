import React from 'react';
import './featureHeader.scss';
import { Link, useHistory } from 'react-router-dom';

const FeatureHeader = (props) => {
	const history = useHistory();
	return (
		<header className="feature-header-center">
			<span onClick={() => history.goBack()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					fill="currentColor"
					className="bi bi-arrow-left-short"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
					/>
				</svg>
			</span>

			<div className="wrap">{props.featureName}</div>
		</header>
	);
};

export default FeatureHeader;
