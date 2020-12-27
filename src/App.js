import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/movie/MovieDetail";
import User from "./pages/user/User";
import UserReg from "./pages/user/UserReg";
import UserLogin from "./pages/user/UserLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import Admin from "./pages/admin/Admin";
import AdminUser from "./pages/admin/AdminUser";
import AdminMovie from "./pages/admin/AdminMovie";
import AdminComment from "./pages/admin/AdminComment";

export default function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/user">User</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <hr />

                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route exact path="/userLogin">
                        <UserLogin />
                    </Route>
                    <Route exact path="/userReg">
                        <UserReg />
                    </Route>
                    <Route exact path="/user">
                        <User />
                    </Route>
                    <Route exact path="/adminLogin">
                        <AdminLogin />
                    </Route>
                    <Route exact path="/adminUser">
                        <AdminUser />
                    </Route>
                    <Route exact path="/adminMovie">
                        <AdminMovie />
                    </Route>
                    <Route exact path="/adminComment">
                        <AdminComment />
                    </Route>
                    <Route exact path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/movieDetail/:id">
                        <MovieDetail />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function About() {
    return <h2>About</h2>;
}
