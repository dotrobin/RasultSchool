import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
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

	return (
		<>
			<Users
				users={users}
				handleDeleteUser={handleDeleteUser}
				handleUserBookmarkStatus={handleUserBookmarkStatus}
			/>
		</>
	);
}

export default App;
