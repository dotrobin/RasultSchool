import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const GroupList = ({ items, valueProperty, contentProperty, selectedItem, onItemSelect }) => {
	return (
		<ul className="list-group">
			{items instanceof Object
				? Object.keys(items).map(item => (
					<li
						role="button"
						key={items[item][valueProperty]}
						className={"list-group-item" + (_.isEqual(items[item], selectedItem) ? " active" : "")}
						onClick={() => onItemSelect(items[item])}
					>
						{items[item][contentProperty]}
					</li>
				))
				: items.map(
					item => (
						<li
							role="button"
							key={item[valueProperty]}
							className={"list-group-item" + (_.isEqual(item, selectedItem) ? " active" : "")}
							onClick={() => onItemSelect(item)}
						>
							{item[contentProperty]}
						</li>
					)
				)
			}
		</ul>
	);
};

GroupList.defaultProps = {
	valueProperty: "_id",
	contentProperty: "name"
};

GroupList.propTypes = {
	items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	onItemSelect: PropTypes.func.isRequired,
	valueProperty: PropTypes.string,
	contentProperty: PropTypes.string,
	selectedItem: PropTypes.object
};

export default GroupList;
