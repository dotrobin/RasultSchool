import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ count }) => {
	let result;
	if (count) {
		const suffix =
			[2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count)
				? "a"
				: "";
		result = (
			<h1>
				<span className="badge bg-primary">
					{count} человек{suffix} тусанет с тобой сегодня
				</span>
			</h1>
		);
	} else {
		result = (
			<h1>
				<span className="badge bg-danger">Никто с тобой не тусанет</span>
			</h1>
		);
	}
	return result;
};

SearchStatus.propTypes = {
	color: PropTypes.string
};

export default SearchStatus;
