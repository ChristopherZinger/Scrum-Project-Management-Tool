import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { LandingPage } from "./LandingPage/LandingPage";


export function AppRoutes () {
    return (
        <Router>
            <Switch>
                <Route path="/login" >
                    <Login />
                </Route>
                <Route path="/signup" >
                    <Register />
                </Route>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    )
}