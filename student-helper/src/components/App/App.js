import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
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
import {isUserAuth} from "../../util/CheckAuthFunctions";
import {getUserRole} from "../../util/CheckAuthFunctions";
import UsersService from "../../repository/userRepository";
import axios from '../../custom-axios/axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserAuth: false,
            userRole: null
        };
    }

    componentDidMount() {
        this.setState({
            isUserAuth: isUserAuth(),
            userRole: getUserRole()
        });
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {
                this.logoutUserHandler();
            }
            return error;
        });

    }

    loginUserHandler = () => {
        this.setState({
            isUserAuth: isUserAuth(),
            userRole: getUserRole()
        });
    };


    logoutUserHandler = () => {
        UsersService.logoutUser();
        this.setState({
            isUserAuth: false,
            userRole: null
        });
        this.props.history.push("/login");
    };


    render() {
        let routes = null;

        if (!this.state.isUserAuth) {
            routes = (
                <Switch>
                    <Route path="/signup" exact component={SignUp}/>
                    <Route path="/login" exact>
                        <Login login={this.loginUserHandler}
                               logout={this.loginUserHandler}/>
                    </Route>
                    <Redirect to="/login"/>
                </Switch>
            );
        } else if (this.state.isUserAuth) {
            if (this.state.userRole !== null && this.state.userRole === "user") {
                routes = (
                    <Route path="/">
                        <Header logout={this.logoutUserHandler}/>
                        <Switch>
                            <Route path="/courses" exact component={MainContainer}/>
                            <Route path="/courses/:name" exact component={CourseDetails}/>
                            <Route path="/users/:name" exact component={UserDetails}/>
                            <Redirect to="/courses"/>
                        </Switch>
                        <Footer/>
                    </Route>
                );
            } else if (this.state.userRole !== null && this.state.userRole === "admin") {
                routes = (
                    <Route path="/">
                        <Header logout={this.logoutUserHandler}/>
                        <Switch>
                            <Route path="/courses" exact component={MainContainer}/>
                            <Route path="/admin/courses" exact component={AdminCourses}/>
                            <Route path="/admin/courses/add" exact component={CourseAdd}/>
                            <Route path="/admin/courses/:courseId/edit" exact component={CourseEdit}/>
                            <Route path="/admin/staff" exact component={AdminStaff}/>
                            <Route path="/courses/:name" exact component={CourseDetails}/>
                            <Redirect to="/admin/courses"/>
                        </Switch>
                        <Footer/>
                    </Route>
                )
            }
        }

        return (
            <BrowserRouter>

                <ScrollToTop>
                    {routes}
                </ScrollToTop>

            </BrowserRouter>
        );
    }
}

export default withRouter(App);
