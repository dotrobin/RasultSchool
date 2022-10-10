import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import User from "./user";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/paginate";
import api from "../api";
import GroupList from "./groupList";
import _ from "lodash";

const Users = ({ users: allUsers, handleDeleteUser, handleUserBookmarkStatus }) => {
	const pageSize = 4;
	const [currentPage, setCurrentPage] = useState(1);
	const [professions, setProfessions] = useState();
	const [selectedProf, setSelectedProf] = useState();

	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfessions(data));
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedProf]);

	const handleProfessionSelect = (item) => {
		if (selectedProf === item) {
			setSelectedProf();
		} else {
			setSelectedProf(item);
		};
	};

	const handlePageGhange = (pageIndex) => {
		setCurrentPage(pageIndex);
	};

	const clearFilter = () => {
		setSelectedProf();
	};

	const filteredUsers = selectedProf ? allUsers.filter((user) => _.isEqual(user.profession, selectedProf)) : allUsers;
	const usersCrop = paginate(filteredUsers, currentPage, pageSize);
	const count = filteredUsers.length;

	return (
		<div className="d-flex">
			{professions && (
				<div className="d-flex flex-column flex-shrink-0 p-3">
					<GroupList
						items={professions}
						selectedItem={selectedProf}
						onItemSelect={handleProfessionSelect}
					/>
					<button
						className="btn btn-secondary mt-2"
						onClick={() => clearFilter()}
					>
						Очистить
					</button>
				</div>
			)}

			<div className="d-flex flex-column">
				<SearchStatus count={count} />
				{count > 0 && (
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
				)}
				<div className="d-flex justify-content-center">
					<Pagination
						itemsCount={count}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={handlePageGhange}
					/>
				</div>
			</div>
		</div>
	);
};

Users.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object),
	handleDeleteUser: PropTypes.func.isRequired,
	handleUserBookmarkStatus: PropTypes.func.isRequired
};

export default Users;
