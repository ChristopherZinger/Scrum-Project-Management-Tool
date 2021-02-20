import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Login } from "./Login/Login";
import { RegisterUser } from "./Register/RegisterUser";
import { LandingPage } from "./LandingPage/LandingPage";
import { RegisterCompany } from "./Register/RegisterCompany";

export enum Routes {
    HOME = '/',
    LOGIN = '/login',
    REGISTER_PROFILE = '/register-profile',
    REGISTER_COMPANY = '/register-company',
    DASHBOARD = '/dashboard'
}

export function AppRoutes () {
    return (
        <Router>
            <Switch>
                <Route path={Routes.LOGIN} >
                    <Login />
                </Route>
                <Route path={Routes.REGISTER_PROFILE} >
                    <RegisterUser />
                </Route>
                <Route path={Routes.REGISTER_COMPANY} >
                    <RegisterCompany />
                </Route>
                <Route path={Routes.HOME}>
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    )
}