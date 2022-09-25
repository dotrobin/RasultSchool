import React from "react";
import User from './user';


const Users = (props) => {

	const users = props.users;

	return (
		<>
			<table className="table table-sm table-striped table-hover" key="table1">
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
							<User {...user} handleDeleteUser={props.handleDeleteUser} handleUserBookmarkStatus={props.handleUserBookmarkStatus} key={key}/>
						)
					})}
				</tbody>
			</table>
		</>
	);
};

export default Users;