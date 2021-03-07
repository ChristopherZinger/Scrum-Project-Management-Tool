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
import { NotFound } from "./404/404";

export enum RoutesMain {
    HOME = '/',
    LOGIN = '/login',
    REGISTER_PROFILE = '/register-profile',
    REGISTER_COMPANY = '/register-company',
    DASHBOARD = '/dashboard'
}

export function AppRoutes () {
    const { user } = useContext(UserAuthStateContext);

    return (
        <Router>
            <Switch>
                {user && <AuthRoutes />}
                {!user && <PublicRoutes />}
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

const AuthRoutes = () =>
    <Route path={[RoutesMain.HOME, RoutesMain.DASHBOARD]} component={Dashboard} />

const PublicRoutes = () =>
    <>
        <Route path={RoutesMain.LOGIN} component={Login} />
        <Route path={RoutesMain.REGISTER_PROFILE} component={RegisterUser} />
        <Route path={RoutesMain.REGISTER_COMPANY} component={RegisterCompany} />
        <Route path="/register-with-invitation/:companyId/:token" component={RegisterWithInvitation} />
        <Route path={RoutesMain.HOME} exact component={LandingPage} />
    </>
