import React from 'react';
import FeatureHeader from './../components/FeatureHeader/FeatureHeader';

const MainLayout = (props) => {
	return (
		<div>
			<FeatureHeader featureName={props.featureName} />
			<div className="main">{props.children}</div>
		</div>
	);
};

export default MainLayout;
