import React from 'react';
import Button from './../../statics-components/Button/Button';

const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
	return <Button onClick={() => onLoadMoreEvt()}>Voir plus...</Button>;
};

export default LoadMore;
