import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
	const history = useHistory();
	const [user, setUser] = useState();
	useEffect(() => {
		api.users.getById(userId).then((data) => setUser(data));
	}, []);
	const handleClick = () => {
		history.push("/users/" + userId + "/edit");
	};

	if (user) {
		return (
			<div>
				<h1>{user.name} </h1>
				<h2>Профессия: {user.profession.name}</h2>
				<Qualities qualities={user.qualities} />
				<p>Complete meetings: {user.completedMeetings}</p>
				<h2>Rate: {user.rate}</h2>
				<button onClick={handleClick}>Изменить</button>
			</div>
		);
	} else {
		return (
			<>
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<div>
					Loading...
				</div>
			</>
		);
	};
};

UserPage.propTypes = {
	userId: PropTypes.string.isRequired
};

export default UserPage;
