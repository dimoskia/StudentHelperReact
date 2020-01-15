import React from "react"
import "../SignUp/SignUp.css"
import logo from'../../images/logo.png';

const login = () => {
    return (
    <div className="container container-table Login">
        <div className="row firstRow">
            <div className="col-sm-9 col-md-7 col-lg-5 my-auto mx-auto">
                <div className="card card-signin my-5">
                    <div className="card-body">
                        <div className="logoDiv">
                            <img src={logo} width="50px" height="50px" alt="" className="logoImage"></img>
                                <i className="h3 pt-2 studentText">Student<i className="helperText">Helper</i></i>
                        </div>
                        <hr>
                        </hr>
                            <form className="form-signin mt-4">
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control"
                                           placeholder="Email address" required autoFocus></input>
                                        <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control"
                                           placeholder="Password" required></input>
                                        <label htmlFor="inputPassword">Password</label>
                                </div>
                                <br>
                                </br>
                                    <button className="btn btn-lg btn-block text-uppercase" type="submit"
                                            id="loginButton">Log in
                                    </button>
                                    <button className="btn btn-lg btn-light btn-block text-uppercase" type="submit">Sign
                                        up
                                    </button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        );
};
export default login;