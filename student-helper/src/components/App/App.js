import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import MainContainer from "../Courses/MainContainer/MainContainer";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseAdd from "../Courses/CourseAdd/CourseAdd";
import CourseEdit from "../Courses/CourseEdit/CourseEdit";
import CourseDetails from "../Courses/CourseDetails/CourseDetails"
import AdminCourses from "../Admin/AdminCourses/AdminCourses";
import ScrollToTop from "../../util/ScrollToTop";
import AdminStaff from "../Admin/AdminStaff/AdminStaff";
import UserDetails from "../User/UserDetails";

class App extends Component {

    isUserAuth = () => {
        return localStorage.getItem("userData") !== null;
    };

    render() {
        let redirectToLogin = null;
        if (!this.isUserAuth())
            redirectToLogin = <Redirect to={"/login"}/>;
        return (
            <BrowserRouter>

                <ScrollToTop>
                    <Switch>
                        <Route path="/signup" exact component={SignUp}/>

                        <Route path="/login" exact component={Login}/>
                        {redirectToLogin}
                        <Route path="/">
                            <Header/>
                            <Switch>
                                <Route path="/courses" exact component={MainContainer}/>
                                <Route path="/admin/courses" exact component={AdminCourses}/>
                                <Route path="/admin/courses/add" exact component={CourseAdd}/>
                                <Route path="/admin/courses/:courseId/edit" exact component={CourseEdit}/>
                                <Route path="/admin/staff" exact component={AdminStaff}/>
                                <Route path="/courses/:name" exact component={CourseDetails}/>
                                <Route path="/users/:name" exact component={UserDetails}/>
                            </Switch>
                            <Footer/>
                        </Route>
                    </Switch>
                </ScrollToTop>

            </BrowserRouter>
        );
    }
}

export default App;
