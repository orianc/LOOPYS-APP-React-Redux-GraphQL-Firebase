import React from 'react';
import './search.scss';

{
	/* 

Les futurs filtres possibles :
 méthode de retrait, jauge de valeur Loopys, date de création
				<input type="checkbox" label="Retrait sur place" />
				<input type="checkbox" label="Envois" /> 				
				*/
}

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
