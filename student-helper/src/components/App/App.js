import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
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
            <BrowserRouter>

                <Switch>
                    <Route path="/signup" exact component={SignUp} />

                    <Route path="/login" exact component={Login} />

                    <Route path="/">
                        <Header/>
                        <Switch>
                            <Route path="/" exact component={MainContainer} />
                            <Route path="/admin/courses" exact component={AdminCourses} />
                            <Route path="/admin/courses/add" exact component={CourseAdd} />
                            <Route path="/course/:courseId/edit" exact component={CourseEdit} />
                            <Route path="/courses/:name" exact component={CourseDetails}/>
                        </Switch>
                        <Footer/>
                    </Route>
                </Switch>

            </BrowserRouter>
        );
    }
}

export default App;
