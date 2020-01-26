import React, {Component} from "react"
import "../SignUp/SignUp.css"
import logo from '../../images/logo2.png';
import {withRouter, Link} from "react-router-dom";
import UsersService from "../../repository/userRepository";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlertSignup: false,
            showAlertWrongCredentials: false,
            wrongCredentialsMessage: ""
        }
    }

    componentDidMount() {
        if (this.props.location.state !== undefined && this.props.location.state.prevPath === "/signup") {
            this.setState({showAlertSignup: true})
        }
    }

    renderAlert = () => {
        if (this.state.showAlertSignup) {
            return (
                <div className="alert alert-info" role="alert">
                    <small>Испратена е потврда за регистрација на Вашиот email</small>
                </div>
            );
        } else if (this.state.showAlertWrongCredentials) {
            return (
                <div className="alert alert-danger" role="alert">
                    <small>{this.state.wrongCredentialsMessage}</small>
                </div>
            );
        }
        return null;
    };

    onFormSubmitHandler = e => {
        e.preventDefault();
        const user = {
            Email: e.target.email.value,
            Password: e.target.password.value
        };
        UsersService.loginUser(user).then(response => {
            UsersService.handleAuthentication(response.data);
            const userData = JSON.parse(localStorage.getItem("userData"));
            this.redirectByRole(userData.User.Role);

        }).catch(error => this.setState({
            showAlertWrongCredentials : true,
            wrongCredentialsMessage: error.response.data}));
    };


    redirectByRole(userRole) {
        this.props.login(userRole);
    }

    render() {
        return (
            <div className="bg-image-login Login">
                <div className="container container-table">
                    <div className="row firstRow">
                        <div className="col-sm-9 col-md-7 col-lg-5 my-auto mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <div className="logoDiv">
                                        <img src={logo} width="50px" height="50px" alt="" className="logoImage"/>
                                        <i className="h3 pt-2 studentText">Student<i
                                            className="helperText text-primary">Helper</i></i>
                                    </div>
                                    {this.renderAlert()}
                                    <hr>
                                    </hr>
                                    <form className="form-signin mt-4" onSubmit={this.onFormSubmitHandler}>
                                        <div className="form-label-group">
                                            <input type="email" id="inputEmail" className="form-control"
                                                   placeholder="Email address" name="email" autoFocus/>
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control"
                                                   placeholder="Password" name="password"/>
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        <br>
                                        </br>
                                        <button className="btn btn-lg btn-block text-uppercase bg-primary" type="submit"
                                                id="loginButton">најави се
                                        </button>
                                        <Link to={"/signup"}
                                              className="btn btn-lg btn-light btn-block text-uppercase signUpButton">регистрирај
                                            се
                                        </Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(Login);