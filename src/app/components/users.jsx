import React, { useState, useEffect } from "react";
import UserTable from "./ui/usersTable";
import Pagination from "./common/pagination";
import SearchStatus from "./ui/searchStatus";
import { paginate } from "../utils/paginate";
import api from "../api";
import GroupList from "./common/groupList";
import Filter from "./filter";
import _ from "lodash";

const Users = () => {
	const pageSize = 8;
	const [currentPage, setCurrentPage] = useState(1);
	const [professions, setProfessions] = useState();
	const [filterByName, setFilterByName] = useState("");
	const [selectedProf, setSelectedProf] = useState();
	const [sortBy, setSortBy] = useState({ path: undefined, order: "asc" });

	const [users, setUsers] = useState([]);
	useEffect(() => {
		api.users.fetchAll().then((data) => setUsers(data));
	}, []);

	const handleDeleteUser = (id) => {
		setUsers(users.filter((user) => user._id !== id));
	};

	const handleUserBookmarkStatus = (id) => {
		setUsers((prevState) =>
			prevState.map((elem) => {
				if (elem._id === id) {
					elem.bookmark = !elem.bookmark;
				}
				return elem;
			})
		);
	};

	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfessions(data));
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedProf]);

	const handleProfessionSelect = (item) => {
		setFilterByName("");
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
	const handleSort = (item) => {
		setSortBy(item);
	};

	const handleSearch = (e) => {
		clearFilter();
		setFilterByName(e.target.value);
	};

	const filteredUsers = selectedProf ? users.filter((user) => _.isEqual(user.profession, selectedProf)) : users;
	const usersFilteredByName = filterByName ? filteredUsers.filter((user) => (user.name.toLowerCase().includes(filterByName.toLowerCase()))) : filteredUsers;
	const sortedUsers = _.orderBy(usersFilteredByName, [sortBy.path], [sortBy.order]);
	const usersCrop = paginate(sortedUsers, currentPage, pageSize);
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
				<Filter value={filterByName} onChange={handleSearch}/>
				{count > 0 && (
					<UserTable
						users={usersCrop}
						onSort={handleSort}
						selectedSort={sortBy}
						onToggleBookmark={handleUserBookmarkStatus}
						onDelete={handleDeleteUser}
					/>
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

export default Users;
