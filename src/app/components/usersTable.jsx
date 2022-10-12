import React from "react";
import PropTypes from "prop-types";
// import User from "./user";
import TableHeader from "./tanbleHeader";
import TableBody from "./tanbleBody";
import Bookmark from "./bookmark";

const UserTable = ({ users, onSort, selectedSort, onToggleBookmark, ...rest }) => {
	const columns = {
		name: { path: "name", name: "Имя" },
		qualities: { name: "Качества" },
		professions: { path: "profession.name", name: "Профессия" },
		complitedMeetings: { path: "completedMeetings", name: "Встретился раз" },
		rate: { path: "rate", name: "Оценка" },
		bookmark: {
			path: "bookmark",
			name: "Избранное",
			component: (user) => (
				<Bookmark
					status={user.bookmark}
					onClick={ () => onToggleBookmark(user._id) } />)
		},
		delete: { component: "delete" }
	};
	return (
		<>
			<table className="table table-sm table-striped table-hover">
				<TableHeader {...{ onSort, selectedSort, columns }}/>
				<TableBody {...{ data: users, columns }}/>
			</table>
		</>
	);
};

UserTable.propTypes = {
	users: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired,
	onToggleBookmark: PropTypes.func.isRequired
};

export default UserTable;
