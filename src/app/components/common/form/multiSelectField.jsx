import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
	const optionsArray = !Array.isArray(options) && typeof (options) === "object"
		? Object.keys(options).map((optionName) => ({ label: options[optionName].name, value: options[optionName]._id }))
		: options;

	const handleChange = (value) => {
		console.log("OP:", options);
		console.log("Name:", name);
		console.log("Value:", value);
		const returnValue = value.map((elem) => {
			for (const option in options) {
				if (options[option]._id === elem.value) {
					return options[option];
				};
			};
			return {};
		});
		console.log("returnValue:", returnValue);
		onChange({ name, value: returnValue });
	};

	return (
		<div className="mb-4">
			<label className="form-label">
				{label}
			</label>
			<Select
				isMulti
				closeMenuOnSelect={false}
				options={optionsArray}
				defaultValue={defaultValue}
				className="basic-multi-select"
				classNamePrefix="select"
				onChange={handleChange}
				name={name}
			/>
		</div>
	);
};

MultiSelectField.propTypes = {
	options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	defaultValue: PropTypes.array,
	onChange: PropTypes.func,
	name: PropTypes.string,
	label: PropTypes.string
};

export default MultiSelectField;
