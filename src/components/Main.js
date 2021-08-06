
import React, { useState } from "react";
import {Route, Switch, Redirect} from  "react-router";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function Main(props) {
    const {isLoggedIn, handleLoggedIn}=props;
    const showLogin =()=>{
        //case 1: already logged in -> show HomePage
        //case 2: has not logged in -? show LoginPage
        return isLoggedIn ? (
            <Redirect to="/home" />
        ) : (
            <Login handleLoggedIn={handleLoggedIn} />
        );
    }
    return <div className="main">
        <Switch>

            <Route path="/login" render={showLogin} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
        </Switch>
    </div>;
}

export default Main;

