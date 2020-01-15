import React, {Component} from 'react';
import {withRouter, Redirect, Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Filters from '../Courses/Filters/Filters';
import Container from "../Courses/Container/Container";

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
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
