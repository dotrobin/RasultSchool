import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Main from "./components/main";
import Login from "./layouts/login";
import NavBar from "./components/navBar";
import UsersInfo from "./components/usersInfo";

function App() {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/users/:userId?" component={UsersInfo} />
				<Route path="/" exact component={Main} />
				<Redirect to="/" />
			</Switch>
		</div>
	);
};

export default App;
