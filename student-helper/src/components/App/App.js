import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Filters from '../Courses/Filters/Filters';
import Container from "../Courses/Container/Container";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

class App extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                            <Route path={"/"} exact>
                                <Header/>
                                <div className="mt-5 container-fluid px-5">
                                    <div className="row">
                                        <Filters/>
                                        <Container/>
                                    </div>
                                </div>
                                <Footer/>
                            </Route>
                            <Route path={"/signup"} exact>
                                <SignUp/>
                            </Route>
                            <Route path={"/login"}>
                                <Login/>
                            </Route>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
