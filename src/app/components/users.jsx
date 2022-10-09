import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import api from "../api";
import GroupList from "./groupList";

const Users = ({ users, handleDeleteUser, handleUserBookmarkStatus }) => {
	const count = users.length;
	const pageSize = 4;

	const [currentPage, setCurrentPage] = useState(1);
	const [professions, setProfessions] = useState();
	const [selectedProf, setSelectedProf] = useState();

	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfessions(data));
	}, []);

	const handleProfessianSelect = (item) => {
		setSelectedProf(item);
	};

	const handlePageGhange = (pageIndex) => {
		setCurrentPage(pageIndex);
	};
	const usersCrop = paginate(users, currentPage, pageSize);

	return (
		<>
			{professions && (
				<GroupList
					items={professions}
					selectedItem={selectedProf}
					onItemSelect={handleProfessianSelect}
				/>
			)}
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
					{usersCrop.map((user, key) => {
						return (
							<User
								{...user}
								handleDeleteUser={handleDeleteUser}
								handleUserBookmarkStatus={handleUserBookmarkStatus}
								key={key}
							/>
						);
					})}
				</tbody>
			</table>
			<Pagination
				itemsCount={count}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChange={handlePageGhange}
			/>
		</>
	);
};

Users.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object),
	handleDeleteUser: PropTypes.func.isRequired,
	handleUserBookmarkStatus: PropTypes.func.isRequired
};

export default Users;
