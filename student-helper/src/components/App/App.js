import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import MainContainer from "../MainContainer/MainContainer";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseAdd from "../Courses/CourseAdd/CourseAdd";
import CourseDetails from "../Courses/CourseDetails/CourseDetails"
import AdminCourses from "../Admin/AdminCourses/AdminCourses";

class App extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>

                    <Route path={"/"} exact>
                        <Header/>
                        <MainContainer/>
                        <Footer/>
                    </Route>

                    <Route path={"/signup"} exact>
                        <SignUp/>
                    </Route>

                    <Route path="/admin/courses">
                        <Header/>
                        <AdminCourses/>
                        <Footer/>
                    </Route>

                    <Route path={"/addCourse"}>
                        <Header/>
                        <CourseAdd/>
                        <Footer/>
                    </Route>

                    <Route path={"/login"}>
                        <Login/>
                    </Route>

                    <Route path="/course">
                        <Header/>
                        <CourseDetails/>
                        <Footer/>
                    </Route>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
