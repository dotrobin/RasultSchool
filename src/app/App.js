import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";

function App() {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route path="/login/:type?" component={Login} />
				<Route path="/users/:userId?/:edit?" component={Users}/>
				<Route path="/" exact component={Main} />
				<Redirect to="/" />
			</Switch>
		</div>
	);
};

export default App;
