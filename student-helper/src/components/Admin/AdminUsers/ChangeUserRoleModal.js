import React from "react";

const ChangeUserRoleModal = (props) => {

    return (
        <div className="card">
            <div className="card-header text-center text-uppercase" style={{
                backgroundColor: "#f7cac9",
                color: "#c94c4c"
            }}>
                <b>Унапредување на корисник</b>
            </div>
            <div className="card-body text-center">
                <p className="card-text">Дали сте сигурни дека сакате да го унапредите корисникот <b>{props.user}</b> во улога admin?
                По унапредувањето ќе имате исти привилегии и нема да можете да го вратите во улога на обичен корисник.</p>
            </div>
            <div className="card-footer" style={{backgroundColor: "white"}}>
                <div className="row">
                    <div className="col">

                        <button onClick={props.modalClosed}
                                className="btn btn-success w-100">
                            <i className="fa fa-times"/> Откажи</button>
                    </div>

                    <div className="col">
                        <button onClick={props.promoteUser}
                                className="btn btn-danger w-100">
                            <i className="fa fa-arrow-up"/> Унапреди</button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ChangeUserRoleModal;