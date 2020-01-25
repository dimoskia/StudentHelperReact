import React from "react";
import {NavLink} from "react-router-dom";
import logo from'../../images/logo2.png';
import user from "../../images/user_image.png"
import './Header.css';

const header = () => {

    return (
        <header className="Header shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">

                    <NavLink className="navbar-brand" to="/">
                        <div className="d-flex align-items-center">
                            <img src={logo} width="45px" height="45px" alt="Student Helper Logo"/>
                            <h3 className="d-inline my-0">Student<span className="text-primary">Helper</span></h3>
                        </div>
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto ml-5">
                            <li className="nav-item">
                                <NavLink to="/admin/courses" className="nav-link text-primary">
                                    <i className="fa fa-bookmark"/>&nbsp;
                                    Менаџирај курсеви
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/staff" className="nav-link text-primary">
                                    <i className="fa fa-user-plus"/>&nbsp;
                                    Менаџирај кадар
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/users" className="nav-link text-primary">
                                    <i className="fa fa-users"/>&nbsp;
                                    Менаџирај корисници
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-primary" href="#" id="navbarDropdownBlog" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false">
                                    FirstName LastName
                                    <img src={user} width="40px" height="40px" className="rounded-circle mx-2"/>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item" href="#"><i className="fa fa-user mr-1 text-primary"/>My Account</a>
                                    <a className="dropdown-item" href="#"><i className="fa fa-sign-out mr-1 text-primary"/>Log out</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default header;
