import React, { useState } from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption }) => {

	return (
			<div className="mb-4">
				<label htmlFor="validationCustom04" className="form-label">
					{label}
				</label>
				<select
					className="form-select"
					id="validationCustom04"
					name="profession"
					value={value}
					onChange={handleChange}
				>
					<option selected={data.profession === ""} disabled value="">
						.{defaultOption}
					</option>
					{professions && Object.keys(professions).map(professionName => (
						<option
							value={professions[professionName]._id}
							key={professions[professionName]._id}
						>
							{professions[professionName].name}
						</option>))}
				</select>
				<div className="invalid-feedback">
					Please select a valid state
				</div>
			</div>
	);
};

SelectField.defaultProps = {
	type: "text"
};

SelectField.propTypes = {

};

export default SelectField;