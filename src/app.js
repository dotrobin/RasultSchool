import React, { useState } from "react";
import Users from "./components/users";
import searchStatus from "./components/searchStatus";
import api from './api';

function App() {
	const [users, setUsers] = useState(api.users.fetchAll());

	const handleDeleteUser = (id) => {
		setUsers(users.filter(user => user._id !== id));
	};


	return (
		<>
			{searchStatus(users.length)}
			{users.length ? <Users users={users} handleDeleteUser={handleDeleteUser}/>: ""}
		</> 
	)
};

export default App;