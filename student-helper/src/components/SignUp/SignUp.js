import React, {Component} from "react"
import "./SignUp.css"
import logo from '../../images/logo2.png';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            FirstName: {
                isValid: false,
                value: ""
            },
            LastName: {
                isValid: false,
                value: ""
            },
            Email: {
                isValid: false,
                value: ""
            },
            Password: {
                isValid: false,
                value: ""
            },
            Password2: {
                isValid: false,
                value: ""
            }
        };
    }

    onChangeHandler = e => {
        this.validateInput(e, false);
    };

    onFormSubmitHandler = e => {
        e.preventDefault();

        if(Object.values(this.state).map(v => v.isValid).every(v => v === true)) {
            console.log("YAY");
        }
        else {
            Object.values(e.target).filter(i => Object.keys(this.state).includes(i.name)).forEach(input => this.validateInput(input, true));
        }
    };

    validateInput = (e, formValidate) => {
        let inputName = null;
        let inputValue = null;
        if(formValidate) {
            inputName = e.name;
            inputValue = e.value;
        }
        else {
            inputName = e.target.name;
            inputValue = e.target.value;
        }
        let isValid = inputValue.length > 0;
        if (inputName === "Email")
            isValid = isValid && this.validateEmail(inputValue);
        else if (inputName === "Password")
            isValid = isValid && this.validatePassword(inputValue);
        else if (inputName === "Password2")
            isValid = isValid && inputValue === this.state.Password.value;
        this.setState({
            [inputName]: {
                isValid: isValid,
                value: inputValue
            }
        }, () => {
            const inputElement = document.getElementById(inputName);
            if (this.state[inputName].isValid)
                inputElement.classList.remove("is-invalid");
            else
                inputElement.classList.add("is-invalid");
        });
    };

    validatePassword = password => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    validateEmail = email => {
        const re = /^\S+\.\S+@students.finki.ukim.mk$/;
        return re.test(email);
    };

    render() {
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
                                        <i className="h3 pt-2 studentText">Student<i
                                            className="helperText text-primary">Helper</i></i>
                                    </div>
                                    <hr>
                                    </hr>
                                    <form className="form-signin mt-4" onSubmit={this.onFormSubmitHandler}>
                                        <div className="form-label-group">
                                            <input type="text" id="FirstName"
                                                   name="FirstName"
                                                   value={this.state.FirstName.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control"
                                                   placeholder="Име"
                                                   autoFocus/>
                                            <label htmlFor="FirstName">Име</label>
                                            <div className="invalid-feedback mx-2">Името е задолжително</div>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="text" id="LastName"
                                                   name="LastName"
                                                   value={this.state.LastName.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control"
                                                   placeholder="Презиме"/>
                                            <label htmlFor="LastName">Презиме</label>
                                            <div className="invalid-feedback mx-2">Презимето е задолжително</div>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="email" id="Email"
                                                   value={this.state.Email.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control"
                                                   placeholder="Email адреса"
                                                   name="Email"
                                            />
                                            <label htmlFor="Email">Email адреса</label>
                                            <div className="invalid-feedback mx-2">Формат:
                                                име.презиме@students.finki.ukim.mk
                                            </div>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="Password"
                                                   value={this.state.Password.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control"
                                                   placeholder="Лозинка"
                                                   name="Password"
                                            />
                                            <label htmlFor="Password">Лозинка</label>
                                            <div className="invalid-feedback mx-2">Минимум 8 карактери, барем по една
                                                голема и мала буква, број и специјален карактер
                                            </div>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="Password2"
                                                   value={this.state.Password2.value}
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onChangeHandler}
                                                   className="form-control"
                                                   placeholder="Потврди лозинка"
                                                   name="Password2"
                                            />
                                            <label htmlFor="Password2">Потврди лозинка</label>
                                            <div className="invalid-feedback mx-2">Лозинките се различни</div>
                                        </div>
                                        <br>
                                        </br>
                                        <button className="btn btn-lg btn-block btn-primary text-uppercase"
                                                type="submit"
                                                id="loginButton">Регистрирај се
                                        </button>
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

export default SignUp;
