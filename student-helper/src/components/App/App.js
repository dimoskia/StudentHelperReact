import React, {Component} from 'react';
import {withRouter, Redirect, Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Filters from '../Courses/Filters/Filters';
import Container from "../Courses/Container/Container";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";

class App extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header/>
                    <div className="container">
                        <Switch>
                            <Route path={"/home"}>
                                    <div className="row">
                                        <Filters/>
                                        <Container/>
                                    </div>
                            </Route>
                            <Route path={"/signup"}>
                                <SignUp/>
                            </Route>
                            <Route path={"/login"}>
                                <Login/>
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
