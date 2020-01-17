import React from "react"
import "./SignUp.css"
import logo from'../../images/logo2.png';

const signUp = () => {
    return (
        <div className="SignUp bg-image-login">
        <div className="container container-table">
            <div className="row firstRow">
                <div className="col-sm-9 col-md-7 col-lg-5 my-auto mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <div className="logoDiv">
                                <img src={logo} width="50px" height="50px" alt="" className="logoImage">
                                </img>
                                    <i className="h3 pt-2 studentText">Student<i className="helperText text-primary">Helper</i></i>
                            </div>
                            <hr>
                            </hr>
                                <form className="form-signin mt-4">
                                    <div className="form-label-group">
                                        <input type="text" id="inputName" className="form-control" placeholder="Name"
                                               required autoFocus></input>
                                            <label htmlFor="inputName">Name</label>

                                    </div>

                                    <div className="form-label-group">
                                        <input type="text" id="inputLastName" className="form-control"
                                               placeholder="Last name" required autoFocus></input>
                                            <label htmlFor="inputLastName">Last name</label>

                                    </div>
                                    <div className="form-label-group">
                                        <input type="email" id="inputEmail" className="form-control"
                                               placeholder="Email address" required autoFocus></input>
                                            <label htmlFor="inputEmail">Email address</label>

                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control"
                                               placeholder="Password" required autoFocus></input>
                                            <label htmlFor="inputPassword">Password</label>

                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPasswordConfirm" className="form-control"
                                               placeholder="Confirm password" required></input>
                                            <label htmlFor="inputPasswordConfirm">Confirm password</label>

                                    </div>
                                    <br>
                                    </br>
                                        <button className="btn btn-lg btn-block btn-primary text-uppercase" type="submit"
                                                id="loginButton">Sign up
                                        </button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        );
};
export default signUp;
