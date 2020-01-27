import React, {useState} from "react";
import user from "../../../images/user_image.png"
import "./UserPrivacy.css"
import UsersService from "../../../repository/userRepository";

const UserPrivacy = (props) => {
    const [inputElem, setInputElem] = useState(null);
    const [oldPassword, setOldPassword] = useState({isValid: false, value: ""});
    const [newPassword1, setNewPassword1] = useState({isValid: false, value: ""});
    const [newPassword2, setNewPassword2] = useState({isValid: false, value: ""});
    const [wrongCredentials,setWrongCredentials]=useState(false);
    const [wrongCredentialsText,setWrongCredentialsText]=useState("");
    const [approvedChange,setApprovedChange]=useState(false);
    const [confirmPassword,setConfirmPassword]=useState("");
    const [confirmPasswordBool,setConfirmPasswordBool]=useState(false);
    const approvedChangeText=useState("Успешно ја променивте вашата лозинка");


    const onSubmitHandler = e => {
        e.preventDefault();
        validateInput(e.target.oldPassword, true);
        validateInput(e.target.newPassword1, true);
        validateInput(e.target.newPassword2, true);
        if(oldPassword.isValid && newPassword1.isValid && newPassword2.isValid) {
            UsersService.changePassword(oldPassword.value,newPassword1.value).then(setApprovedChange(true)).catch(error=>changeWrongCredentials(error.response.data));
        }
        setWrongCredentials(false);
    };

    const changeWrongCredentials = (textWrongCredentials) =>{
        setWrongCredentials(true);
        setWrongCredentialsText(textWrongCredentials);
    };

    const onChangeHandler = e => {
        validateInput(e, false);
    };

    const renderAlert = () =>{
        if (wrongCredentials) {
            return (
                <div className="alert alert-danger" role="alert">
                    <small>{wrongCredentialsText}</small>
                </div>
            );
        }
        else if(approvedChange){
            return (
                <div className="alert alert-success" role="alert">
                    <small>{approvedChangeText}</small>
                </div>
            );
        }
    };

    const onClickClose = () =>{
        setApprovedChange(false);
        setOldPassword({
            isValid: false, value: ""
        });
        setNewPassword1({
            isValid: false, value: ""
        });
        setNewPassword2({
            isValid: false, value: ""
        });
    };

    const validateInput = (e, formValidate) => {
        let inputName = null;
        let inputValue = null;
        if (formValidate) {
            inputName = e.name;
            inputValue = e.value;
        } else {
            inputName = e.target.name;
            inputValue = e.target.value;
        }
        let isValid = inputValue.toString().trim().length > 0;
        if(inputName === "oldPassword") {
            setOldPassword({isValid : isValid, value : inputValue});
        }
        else if(inputName === "newPassword1") {
            isValid = isValid && validatePassword(inputValue);
            setNewPassword1({isValid : isValid, value : inputValue});
        }
        else {
            isValid = isValid && inputValue === newPassword1.value;
            setNewPassword2({isValid : isValid, value : inputValue});
        }
        const inputElement = document.getElementById(inputName);
        if (isValid)
            inputElement.classList.remove("is-invalid");
        else
            inputElement.classList.add("is-invalid");
    };

    const validatePassword = password => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const changePasswordDeactivate = (e) =>{
        setConfirmPassword(e.target.value);
    };

    const submitFormDeactivate = (e) =>{
        e.preventDefault();
        UsersService.deactivateUser(confirmPassword).then().catch(error=>changeConfirmPassword(error.response.data)
        )};

    const changeConfirmPassword = (textConfirmPassword) =>{
        setConfirmPasswordBool(true);
        setConfirmPassword(textConfirmPassword);
    };

    const renderFormDeactivate = () =>{
        if (confirmPasswordBool) {

            return (
                <div className="alert alert-danger m-1" role="alert">
                    <small>{confirmPassword}</small>
                </div>
            );
        }
    };

    const resetFormDeactivate = () =>{
        setConfirmPasswordBool(false);
        document.getElementById("inputPasswordDeactivate").value="";
    };


    return (
        <div className="col-3 userPrivacy mt-3">
            <div className="card cardDetails shadow-sm h-100">
                <div className="content my-4" onClick={() => inputElem.click()}>
                    <div className="content-overlay rounded-circle"/>
                    <img src={props.imgUrl===null ? user : props.imgUrl} alt=""
                         className="rounded-circle" width="200px" height="200px"/>
                    <div className="content-details fadeIn-bottom">
                        <p className="content-text"><span className="fa fa-lg fa-edit"/></p>
                    </div>
                </div>
                <input type="file" ref={input => setInputElem(input)} accept="image/*"
                       style={{display: 'none'}} onChange={(e) => props.imageHandler(e)}/>
                <button className="btn btn-primary mt-2 mx-3" data-toggle="modal" data-target="#modalPassword">
                    Промени лозинка
                </button>
                <button className="btn btn-danger my-3 mx-3" data-toggle="modal" data-target="#modalDeactivate">
                    Деактивирај профил
                </button>
            </div>

            <div className="modal fade" id="modalPassword" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h4 className="modal-title text-primary">Промени ја својата лозинка</h4>
                            <button type="butto" className="close" data-dismiss="modal" onClick={onClickClose}>&times;</button>
                        </div>

                        <form onSubmit={onSubmitHandler}>
                            <div className="modal-body">
                                {renderAlert()}
                                <div className="row mt-2 mr-3">
                                    <div className="col-5 text-right my-auto"><b>Лозинка</b></div>
                                    <div className="col-7 form-label-group">
                                        <input type="password"
                                               name="oldPassword"
                                               id="oldPassword"
                                               value={oldPassword.value}
                                               onChange={onChangeHandler}
                                               className="form-control" placeholder="Моментална лозинка"/>
                                        <div className="invalid-feedback">Лозинката е задолжителна
                                        </div>
                                    </div>

                                </div>
                                <div className="row mt-2 mr-3">
                                    <div className="col-5 text-right my-auto"><b>Нова лозинка</b></div>
                                    <div className="col-7 form-label-group">
                                        <input type="password"
                                               name="newPassword1"
                                               id="newPassword1"
                                               value={newPassword1.value}
                                               onChange={onChangeHandler}
                                               onBlur={onChangeHandler}
                                               className="form-control" placeholder="Нова лозинка"/>
                                        <div className="invalid-feedback">Минимум 8 карактери, барем по една
                                            голема и мала буква, број и специјален карактер
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2 mr-3 mb-3">
                                    <div className="col-5 text-right my-auto"><b>Повтори лозинка</b></div>
                                    <div className="col-7 form-label-group">
                                        <input type="password"
                                               name="newPassword2"
                                               id="newPassword2"
                                               value={newPassword2.value}
                                               onChange={onChangeHandler}
                                               onBlur={onChangeHandler}
                                               className="form-control" placeholder="Нова лозинка"/>
                                        <div className="invalid-feedback mx-2">Лозинките се различни</div>
                                    </div>
                                </div>
                                <div className="row p-3">
                                    <div className="col-6">
                                        <button type="button" className="btn btn-success w-100" data-dismiss="modal" onClick={onClickClose}>Откажи
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button type="submit" className="btn btn-primary w-100">Промени</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalDeactivate" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h4 className="modal-title text-danger">Деактивирај го профилот</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={resetFormDeactivate}>&times;</button>
                        </div>
                        {renderFormDeactivate()}
                        <form onSubmit={submitFormDeactivate}>
                            <div className="modal-body pb-0">
                                <p className="font-italic text-danger">По деактивација на профилот, истиот не може да се
                                    врати назад.</p>
                                <p>Внесете лозинка за деактивација на профилот:</p>
                                <input type="password" className="form-control w-100 mx-auto"
                                       id="inputPasswordDeactivate"
                                       placeholder="Лозинка" onChange={(e) => changePasswordDeactivate(e)}/>

                            </div>
                            <div className="row p-3">
                                <div className="col-6">
                                    <button type="button" className="btn btn-success w-100" data-dismiss="modal" onClick={resetFormDeactivate}>Откажи
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button type="submit" className="btn btn-danger w-100">Деактивирај</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
};

export default UserPrivacy;