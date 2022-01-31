import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";

import EditPost from './admin/EditPost';
import Dashboard from './admin/Dashboard';
import authenticationService from '../_services/authentication.service';

export default function Admin({ match }) {

	const [user, setUser] = useState({ isAuthenticated: false, user: null, failed: null });

	useEffect(() => {
		authenticationService.getUserData()
			.then(userData => {
				setUser(userData)
			}).catch(e => {
				console.log(e);
				setUser({failed: true});
			})
	}, [])

	if (user.isAuthenticated) {
		return (
			<Switch>
				<Route path={`${match.path}/editblog`} component={EditPost} />
				<Route path={`${match.path}`} render={(props) => <Dashboard {...props} user={user} />} />
			</Switch>
		)
	} else if (user.failed) {
		return (
			<h1>Failed to Authenticate</h1>
		)
	}
	return null
}