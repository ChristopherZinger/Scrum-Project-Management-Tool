import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Login } from "./Login/Login";
import { RegisterUser } from "./Register/RegisterUser";
import { LandingPage } from "./LandingPage/LandingPage";
import { RegisterCompany } from "./Register/RegisterCompany";
import { RegisterWithInvitation } from "./Register/RegisterWithInvitation";
import { UserAuthStateContext } from "../../App";
import { Dashboard } from "./Dashboard/Dashboard";

export enum RoutesMain {
    HOME = '/',
    LOGIN = '/login',
    REGISTER_PROFILE = '/register-profile',
    REGISTER_COMPANY = '/register-company',
    DASHBOARD = '/dashboard'
}

export function AppRoutes () {
    const { user } = useContext(UserAuthStateContext);

    const routes = [];

    if (user) {
        routes.push(
            <Route path={[RoutesMain.HOME, RoutesMain.DASHBOARD]}>
                <Dashboard user={user} />
            </Route>)
    } else {
        routes.push(
            ...[
                (
                    <Route path={RoutesMain.LOGIN} >
                        <Login />
                    </Route>
                ),
                (
                    <Route path={RoutesMain.REGISTER_PROFILE} >
                        <RegisterUser />
                    </Route>
                ),
                (
                    <Route path={RoutesMain.REGISTER_COMPANY} >
                        <RegisterCompany />
                    </Route>
                ),
                (
                    <Route path="/register-with-invitation/:companyId/:token" component={RegisterWithInvitation} />
                ),
                (
                    <Route path={RoutesMain.HOME}>
                        <LandingPage />
                    </Route>
                )
            ]
        )
    }

    return (
        <Router>
            <Switch>
                {routes.map(route => route)}
            </Switch>
        </Router>
    )
}
