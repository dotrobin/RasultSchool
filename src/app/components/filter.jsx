import React from "react";
import PropTypes from "prop-types";

const Filter = ({ value, onChange }) => {
	return (
		<form>
			<div className="mb-3">
				<input
					className="form-control"
					type="text"
					placeholder="Search..."
					id="searchFiled"
					name="searchFiled"
					value={value}
					onChange={onChange}
				/>
			</div>
		</form>
	);
};

Filter.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};
export default Filter;
