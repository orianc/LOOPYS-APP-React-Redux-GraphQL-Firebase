import React from 'react';
import './search.scss';

const SearchInput = ({
	options,
	defaultValue,
	handleChange,
	label,
	placeholder,
	...otherProps
}) => {
	console.log();
	return (
		<div className="search">
			<h3>Recherche :</h3>
			<div className="searchInputWrap">
				{label && <label>{label}</label>}
				<input
					className="searchInput"
					maxLength={20}
					onChange={handleChange}
					placeholder={placeholder}
					{...otherProps}
				/>
				{/* 

Les futurs filtres possibles :
 méthode de retrait, jauge de valeur Loopys, date de création
				<input type="checkbox" label="Retrait sur place" />
				<input type="checkbox" label="Envois" /> 				
				*/}
			</div>
		</div>
	);
};

export default SearchInput;
