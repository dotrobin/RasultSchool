import React, { useState } from "react";
import api from '../../api/index';
import mainBadget from "../badget/mainBadget";

const Users = () => {

	let [users, setUsers] = useState(api.users.fetchAll());

	const handleDeleteUser = (id) => {
		setUsers(users.filter(user => user._id !== id));
	};

	const getBageClasses = (name) => {
		let classes = "badge m-1 bg-";
		classes += name;
		return classes
	};

	const userTable = () => {
		let result = (
			<table className="table table-sm table-striped table-hover">
				<thead className="table-dark">
					<tr>
						<th scope="col">Имя</th>
						<th scope="col">Качества</th>
						<th scope="col">Профессия</th>
						<th scope="col">Встретился раз</th>
						<th scope="col">Оценка</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, key) => {
						return (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{
									user.qualities.map((quality, key) => {
										return (<span className={getBageClasses(quality.color)} key={key}>{quality.name}</span>)	
									})}
								</td>
								<td>{user.profession.name}</td>
								<td>{user.completedMeetings}</td>
								<td>{user.rate}</td>
								<td><button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>delete</button></td>
							</tr>
						)
					})}
				</tbody>
			</table>
		);

		return result;
	};


	return (
		<>
			{mainBadget(users.length)}
			{users.length ? userTable(): ""}
		</>
	);
};

export default Users;