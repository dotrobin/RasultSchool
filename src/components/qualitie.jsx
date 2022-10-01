import React from "react";
import PropTypes from "prop-types";

const getBageClasses = (colorName) => {
	let classes = "badge m-1 bg-";
	classes += colorName;
	return classes;
};

const Quality = ({ color, name }) => {
	return <span className={getBageClasses(color)}>{name} </span>;
};

Quality.propTypes = {
	color: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};
export default Quality;
