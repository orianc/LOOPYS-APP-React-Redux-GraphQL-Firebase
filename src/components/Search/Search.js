import React from 'react';
import './search.scss';

const SearchInput = ({
	options,
	defaultValue,
	handleSearch,
	label,
	placeholder,
	...otherProps
}) => {
	return (
		<div className="search">
			<h3>Recherche :</h3>
			<div className="searchInputWrap">
				{label && <label>{label}</label>}
				<input
					className="searchInput"
					onChange={handleSearch}
					placeholder={placeholder}
					{...otherProps}
				/>
			</div>
		</div>
	);
};

export default SearchInput;
