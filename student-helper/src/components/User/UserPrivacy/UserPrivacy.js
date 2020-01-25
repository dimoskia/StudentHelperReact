import React, {useState} from "react";
import user from "../../../images/user_image.png"
import "./UserPrivacy.css"

const UserPrivacy = () =>{
    const [inputElem, setInputElem] = useState(null);

    return(
        <div className="col-3 userPrivacy mt-3">
            <div className="card cardDetails shadow-sm h-100">
                <div className="content my-4" onClick={() => inputElem.click()}>
                    <div className="content-overlay"/>
                    <img src={user} alt=""
                         className="content-image img-thumbnail img-fluid" width="200px" height="200px"/>
                    <div className="content-details fadeIn-bottom">
                        <p className="content-text"><span className="fa fa-lg fa-edit"/></p>
                    </div>
                </div>
                <input type="file" ref={input => setInputElem(input)} accept="image/*"
                       style={{display: 'none'}}/>
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
                            <h4 className="modal-title">Промени ја својата лозинка</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="row mt-2 mr-3">
                                <div className="col-5 text-right my-auto"><b>Лозинка</b></div>
                                <div className="col-7">
                                    <input type="password" className="form-control" placeholder="Моментална лозинка"/>
                                </div>
                            </div>
                            <div className="row mt-2 mr-3">
                                <div className="col-5 text-right my-auto"><b>Нова лозинка</b></div>
                                <div className="col-7">
                                    <input type="password" className="form-control" placeholder="Нова лозинка"/>
                                </div>
                            </div>
                            <div className="row mt-2 mr-3 mb-3">
                                <div className="col-5 text-right my-auto"><b>Повтори лозинка</b></div>
                                <div className="col-7">
                                    <input type="password" className="form-control" placeholder="Нова лозинка"/>
                                </div>
                            </div>
                            <div className="modal-footer text-center">
                                <button type="button" className="btn btn-default mx-auto btn-primary confirmButton">Потврди промена</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalDeactivate" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h4 className="modal-title">Деактивирај го профилот</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center mb-2">Внесете лозинка за деактивација на профил</div>
                            <input type="password" className="form-control w-50 mx-auto" placeholder="Лозинка"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-danger mx-auto">Деактивирај</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
};

export default UserPrivacy;