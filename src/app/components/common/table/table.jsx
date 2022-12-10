import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
	return (
		<table className="table table-sm table-striped table-hover">
			{children || (
				<>
					<TableHeader {...{ onSort, selectedSort, columns }}/>
					<TableBody {...{ data, columns }}/>
				</>
			)
			}
		</table>
	);
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired,
	columns: PropTypes.object.isRequired,
	children: PropTypes.array
};

export default Table;
