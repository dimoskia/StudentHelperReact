import React from "react";
import user from "../../../images/user_image.png"
import "./UserPrivacy.css"

const UserPrivacy = () =>{
    return(
        <div className="col-3 userPrivacy">
            <div className="card my-3 cardDetails shadow-sm">
                <div className="content my-4">
                    <div className="content-overlay"/>
                    <img src={user} alt=""
                         className="content-image img-thumbnail img-fluid" width="200px" height="200px"/>
                    <div className="content-details fadeIn-bottom">
                        <p className="content-text"><span className="fa fa-lg fa-edit"/></p>
                    </div>
                </div>
                <input type="file" accept="image/*"
                       style={{display: 'none'}}/>
                <button className="btn btn-primary  mt-2 mx-3" data-toggle="modal" data-target="#myModal">
                    Промени лозинка
                </button>
                <button className="btn btn-danger  my-3 mx-3" data-toggle="modal" data-target="#modal2">
                    Деактивирај профил
                </button>
            </div>

            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h4 className="modal-title">Промени ја својата лозинка</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="row mt-2 mr-3">
                                <div className="col-5 text-right my-auto"><b>Нова лозинка</b></div>
                                <div className="col-7">
                                    <input type="password" className="form-control emailInput"/>
                                </div>
                            </div>
                            <div className="row mt-2 mr-3 mb-3">
                                <div className="col-5 text-right my-auto"><b>Повтори лозинка</b></div>
                                <div className="col-7">
                                    <input type="password" className="form-control emailInput"/>
                                </div>
                            </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-primary">Потврди</button>
                        </div>
                    </div>

                    </div>
                </div>
            </div>

            <div className="modal fade" id="modal2" role="dialog">
                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h4 className="modal-title">Деактивирај го профилот</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Дали сте сигурни дека сакате да го деактивирате вашиот профил?
                            </p>
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default btn-danger">Деактивирај</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
};

export default UserPrivacy;