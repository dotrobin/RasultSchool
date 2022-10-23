import React from "react";
import PropTypes from "prop-types";
import Users from "./users";
import User from "./user";

const UsersInfo = ({ match }) => {
	const userId = match.params.userId;
	return (
		<>
			{userId
				? <User userId={userId}/>
				: <Users />
			}
		</>);
};

UsersInfo.propTypes = {
	match: PropTypes.object.isRequired
};

export default UsersInfo;
