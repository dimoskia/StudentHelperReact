import React, {Component} from "react";
import {withRouter, NavLink, Link} from "react-router-dom";
import logo from '../../images/logo2.png';
import defaultUserImg from "../../images/user_image.png"
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        const userData = JSON.parse(localStorage.getItem("userData"));
        this.state = {
            Id : userData.User.Id,
            FirstName: userData.User.UserDetails.FirstName,
            LastName: userData.User.UserDetails.LastName,
            ImageUrl: userData.User.UserDetails.ImageUrl,
            isUserAdmin: userData.User.Role === "admin"
        }
    }

    getFullName = () => {
        return `${this.state.FirstName} ${this.state.LastName}`;
    };

    onLogoutHandler = () => {
        this.props.logout();
    };

    renderAdminLinks = () => {
        if (this.state.isUserAdmin) {
            return (
                <ul className="navbar-nav mr-auto ml-2">
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
                    <li className="nav-item">
                        <NavLink to="/courses" className="nav-link text-primary">
                            <i className="fa fa-book"/>&nbsp;
                            Прегледај курсеви
                        </NavLink>
                    </li>
                </ul>
            );
        }
        return null;
    };

    render() {
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
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {this.renderAdminLinks()}
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle text-primary" id="navbarDropdownBlog"
                                      data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                    {this.getFullName()}
                                    <img src={this.state.ImageUrl !== null ? this.state.ImageUrl : defaultUserImg}
                                         width="40px" alt="User profile" height="40px"
                                         className="rounded-circle mx-2"/>
                                </span>
                                    <div className="dropdown-menu dropdown-menu-right"
                                         aria-labelledby="navbarDropdownBlog">
                                        <Link to={`/users/${this.state.Id}`} className="dropdown-item"><i className="fa fa-user mr-1 text-primary"/> Мој профил</Link>
                                        <span className="dropdown-item"
                                              onClick={this.onLogoutHandler}><i
                                            className="fa fa-sign-out mr-1 text-primary"/>Одјави се</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }

}

export default withRouter(Header);
