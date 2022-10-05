import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, onItemSelect }) => {
	console.log(items);
	return (
		<ul className="list-group">
			{Object.keys(items).map(item => (
				<li key={items[item]._id} className="list-group-item">{items[item].name}</li>
			))}
		</ul>
	);
};

GroupList.propTypes = {
	items: PropTypes.object.isRequired,
	onItemSelect: PropTypes.func.isRequired
};

export default GroupList;
