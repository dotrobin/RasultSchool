import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultValue, options, error, name }) => {
	const optionsArray = !Array.isArray(options) && typeof (options) === "object"
		? Object.keys(options).map((optionName) => ({ name: options[optionName].name, value: options[optionName]._id }))
		: options;

	const getInputClasses = () => {
		return "form-select" + (error ? " is-invalid" : "");
	};
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};

	return (
		<div className="mb-4">
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			<select
				defaultValue={defaultValue}
				className={getInputClasses()}
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
			>
				<option disabled value="">
					{defaultValue}
				</option>
				{optionsArray && optionsArray.map(option => (
					<option
						value={option.value}
						key={option.value}
					>
						{option.name}
					</option>
				))}
			</select>
			{error && (
				<div className="invalid-feedback">
					{error}
				</div>
			)}
		</div>
	);
};

SelectField.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	error: PropTypes.string,
	options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SelectField;
