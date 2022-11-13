import React from "react";
import { useParams } from "react-router-dom";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEditPage";

const Users = () => {
	const params = useParams();
	const { userId, status } = params;
	return (
		<>
			{userId
				? status === "edit"
					? <UserEditPage userId={userId}/>
					: <UserPage userId={userId}/>
				: <UsersListPage />
			}
		</>
	);
};

export default Users;
