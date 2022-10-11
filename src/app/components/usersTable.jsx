import React from "react";
import PropTypes from "prop-types";
import User from "./user";
import TableHeader from "./tanbleHeader";

const UserTable = ({ users, onSort, selectedSort, ...rest }) => {
	const columns = {
		name: { iter: "name", name: "Имя" },
		qualities: { name: "Качества" },
		professions: { iter: "professions.name", name: "Профессия" },
		complitedMeetings: { iter: "completedMeetings", name: "Встретился раз" },
		rate: { iter: "rate", name: "Оценка" },
		bookmark: { iter: "bookmark", name: "Избранное" },
		delete: {}
	};
	return (
		<>
			<table className="table table-sm table-striped table-hover">
				<TableHeader {...{ onSort, selectedSort, columns }}/>
				<tbody>
					{users.map((user, key) => {
						return (
							<User
								{...user}
								{...rest}
								key={key}
							/>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

UserTable.propTypes = {
	users: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired
};

export default UserTable;
