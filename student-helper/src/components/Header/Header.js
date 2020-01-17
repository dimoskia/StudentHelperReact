import React from "react";
import './Header.css';
import {NavLink} from "react-router-dom";
import logo from'../../images/logo2.png';
import user from "../../images/user_image.png"

const header = () => {
    return (
        <header className="Header shadow-sm">
            <nav className="navbar navbar-expand-lg bg-light navbar-light">
                <div className="container-fluid px-5 py-0">
                    <NavLink className="navbar-brand pt-2" to={"/home"}>
                        <img src={logo} width="45px" height="45px" alt="" className="logo"/>
                        <i className="h3 pt-2 logoText1">Student
                            <i className="logoText2 text-primary">Helper</i>
                        </i>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-primary" href="#" id="navbarDropdownBlog" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false">
                                    FirstName LastName
                                    <img src={user} width="40px" height="40px" className="rounded-circle mx-2"></img>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                    <a className="dropdown-item" href="#"><i className="fa fa-user mr-1 text-primary"></i>My Account</a>
                                    <a className="dropdown-item" href="#"><i className="fa fa-sign-out mr-1 text-primary"></i>Log out</a>
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