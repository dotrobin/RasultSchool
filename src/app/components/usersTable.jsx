import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UserTable = ({ users, ...rest }) => {
	return (
		<>
			<table className="table table-sm table-striped table-hover">
				<thead className="table-dark">
					<tr>
						<th scope="col">Имя</th>
						<th scope="col">Качества</th>
						<th scope="col">Профессия</th>
						<th scope="col">Встретился раз</th>
						<th scope="col">Оценка</th>
						<th scope="col">Избранное</th>
						<th scope="col"></th>
					</tr>
				</thead>
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
	users: PropTypes.array.isRequired
};

export default UserTable;
