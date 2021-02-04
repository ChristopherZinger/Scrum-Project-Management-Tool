import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Login } from "./Login/Login";
import { Signup } from "./Signup/Signup";
import { LandingPage } from "./LandingPage/LandingPage";


export function AppRoutes () {
    return (
        <Router>
            <Switch>
                <Route path="/login" >
                    <Login />
                </Route>
                <Route path="/signup" >
                    <Signup />
                </Route>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    )
}