import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserInfo = ({ userId }) => {
	const history = useHistory();
	const [user, setUser] = useState();
	useEffect(() => {
		api.users.getById(userId).then((data) => setUser(data));
	}, []);
	console.log("user:", user);
	const userRender = () => {
		return (
			<>
				<h1>{user.name}</h1>
				<h2>Профессия: {user.profession.name}</h2>
				{<QualitiesList
					qualities={user.qualities}
				/>}
				<h5>Complete Meetings: {user.completedMeetings}</h5>
				<h4>Rate: {user.rate}</h4>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => {
						history.push("/users");
					}}
				>
					Все пользователи
				</button>
			</>
		);
	};

	return (
		<>
			{user
				? userRender()
				: <h2>Loading</h2>
			}
		</>
	);
};

UserInfo.propTypes = {
	userId: PropTypes.string.isRequired
};

export default UserInfo;
