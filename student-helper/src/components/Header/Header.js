import React from "react";
import './Header.css';
import {NavLink} from "react-router-dom";
import logo from'../../images/logo.png';

const header = () => {
    return (
        <header className="Header">
            <nav className="navbar navbar-expand-lg bg-light navbar-light">
                <div className="container-fluid px-5 py-0">
                    <NavLink className="navbar-brand pt-2" to={"/home"}>
                        <img src={logo} width="45px" height="45px" alt="" className="logo"/>
                        <i className="h3 pt-2 logoText1">Student
                            <i className="logoText2">Helper</i>
                        </i>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                        </ul>
                    </div>
                </div>
            </nav>
        </header>


    )
};

export default header;