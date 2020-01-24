import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import MainContainer from "../MainContainer/MainContainer";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseAdd from "../Courses/CourseAdd/CourseAdd";
import CourseEdit from "../Courses/CourseEdit/CourseEdit";
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

                    <Route path="/admin/courses" exact>
                        <Header/>
                        <AdminCourses/>
                        <Footer/>
                    </Route>

                    <Route path={"/admin/courses/add"} exact>
                        <Header/>
                        <CourseAdd/>
                        <Footer/>
                    </Route>

                    <Route path={"/course/:courseId/edit"} exact>
                        <Header/>
                        <CourseEdit/>
                        <Footer/>
                    </Route>

                    <Route path={"/login"} exact>
                        <Login/>
                    </Route>

                    <Route path="/courses/:name" render={props=>
                        <div>
                            <Header/>
                            <CourseDetails {...props}/>
                            <Footer/>
                        </div>}/>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
