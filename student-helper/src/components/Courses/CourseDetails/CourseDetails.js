import React, {Component} from 'react'
import sample from "../../../images/course.jpg"
import './CourseDetails.css'
import {Link} from "react-router-dom";
import rs from "../../../images/rs.PNG"
import dt from "../../../images/dt.PNG"

class courseDetails extends Component{

    constructor(props) {
        super(props);
        this.state={
        }
    }

    componentDidMount() {
    }

    render(){

        return (
            <div className="container-fluid px-5 py-0 courseDetails">
                <div className="row mt-3">
                    <div className="col">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2>Веб базирани системи</h2>
                                <span><Link to="/">Дома </Link> / Веб базирани системи</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-3">
                        <div className="card mb-3 bg-light shadow-sm">
                            <img src={sample} className="card-img-top img-thumbnail" alt=""/>
                            <div className="ml-3 mt-2">
                                <ul className="timeline">
                                    <li className="timeline-inverted">
                                        <div className="timeline-badge bg-primary">
                                        </div>
                                        <div className="timeline-panel">
                                            <div className="timeline-heading">
                                                <span><b>Семестар</b></span>
                                                <br/>
                                                <small>Зимски</small>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="timeline-inverted">
                                        <div className="timeline-badge bg-primary">
                                        </div>
                                        <div className="timeline-panel">
                                            <div className="timeline-heading">
                                                <span><b>Година</b></span>
                                                <br/>
                                                <small>1-ва година</small>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="timeline-inverted">
                                        <div className="timeline-badge bg-primary">
                                        </div>
                                        <div className="timeline-panel">
                                            <div className="timeline-heading">
                                                <span><b>Статус</b></span>
                                                <br/>
                                                <small>Задолжителен</small>
                                            </div>

                                        </div>
                                    </li>

                                    <li className="timeline-inverted">
                                        <div className="timeline-badge bg-primary">
                                        </div>
                                        <div className="timeline-panel">
                                            <div className="timeline-heading">
                                                <span><b>Смер</b></span>
                                                <br/>
                                                <small>КНИ</small>
                                            </div>

                                        </div>
                                    </li>
                                </ul>

                                <div className="pr-3 mb-3">
                                    <a className="btn btn-primary btn-block ml-0" href="https://finki.ukim.mk/mk/subject/%D0%B2%D0%B5%D0%B1-%D0%B1%D0%B0%D0%B7%D0%B8%D1%80%D0%B0%D0%BD%D0%B8-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B8">Детали</a>
                                </div>
                                <div className="mb-2 pr-2">
                                    <h5><b>Опис</b></h5>
                                    <p>Развој на напредни веб 2.0 апликации. Развој на апликации за Веб 3.0 (Семантички веб). Користење на отворени податоци. Поврзување наподатоците. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="card bg-light shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h4><b>Постави прашање</b></h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <h5><b>Наслов</b></h5>
                                <input type="text" name="Title" className="form-control mb-3"
                                       placeholder="пр. Каков е начинот на полагање на предметот?"/>
                                <h5><b>Опис</b></h5>
                                <textarea className="form-control" name="Comment"
                                          placeholder="Внесете опис"/>
                                <button type="submit" className="btn btn-primary float-right mt-3">Постави прашање</button>
                            </form>
                        </div>
                    </div>
                        <div className="card my-3 shadow-sm">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-2 text-center my-auto">
                                        <img className="rounded-circle d-inline img-fluid shadow-sm" width="60px" height="60px" src={rs} alt=""/>
                                    </div>
                                    <div className="col-10 pl-0">
                                        <h5 className="mb-0"><b>Како да го положам предметот?</b></h5>
                                        <div className="text-muted mb-2">
                                            <small>објавено од </small><Link to="#"><small className="d-inline text-muted">Христијан Давиновски</small></Link>
                                        </div>
                                        <p className="mb-1">Здраво колеги, имам многу за учење ама истовремено имам и за правење проект
                                            по интернет технологии.
                                            Дали треба да паднам веб базирани системи?</p>
                                        <span className="arrowsUp1">
                                            <i className="fa fa-thumbs-o-up arrowsUp2 text-success fa-lg"/>
                                        </span>
                                        <span className="text-center mb-0 mx-2 text-muted countNumber">99</span>
                                        <span className="arrowsDown">
                                            <i className="fa fa-thumbs-o-down arrowsDown2 text-danger fa-lg"/>
                                        </span>
                                    </div>
                                </div>
                                    <form>
                                        <div className="card mt-3 shadow-sm bg-light">
                                            <div className="card-body p-2">
                                                <textarea className="form-control" placeholder="Напишете коментар"/>
                                                <button type="submit" className="btn btn-primary float-right mt-2 mb-1">Коментирај</button>
                                        </div>
                                        </div>

                                    </form>
                                <div className="row my-2 mx-2 shadow-sm bg-light">
                                    <div className="col-2 text-center my-auto">
                                        <img className="rounded-circle d-inline img-fluid shadow-sm" width="55px" height="55px" src={rs} alt=""/>
                                    </div>
                                    <div className="col-8 pl-0 my-auto">
                                        <div>
                                            <Link to="#"><small className="d-inline text-muted">Бојана
                                                Котеска</small></Link>
                                        </div>
                                        <div>ххххххххххххххх.
                                        </div>
                                        <span className="arrowsUp">
                                            <i className="fa fa-thumbs-o-up arrowsUp2 text-success"/>
                                        </span>
                                        <span className="text-center mb-0 mx-2 text-muted countNumber">99</span>
                                        <span className="arrowsDown">
                                            <i className="fa fa-thumbs-o-down arrowsDown2 text-danger "/>
                                        </span>
                                    </div>
                                </div>

                                <div className="row my-2 mx-2 shadow-sm bg-light">
                                    <div className="col-2 text-center my-auto">
                                        <img className="rounded-circle d-inline img-fluid shadow-sm" width="55px" height="55px" src={rs} alt=""/>

                                    </div>
                                    <div className="col-8 pl-0 my-auto">
                                        <div>
                                            <Link to="#"><small className="d-inline text-muted">Бојана Котеска</small></Link>
                                        </div>
                                        <div>ххххххххххххххх.</div>
                                        <span className="arrowsUp">
                                        <i className="fa fa-thumbs-o-up arrowsUp2 text-success"/>
                                        </span>
                                        <span className="text-center mb-0 mx-2 text-muted countNumber">158</span>
                                        <span className="arrowsDown">
                                        <i className="fa fa-thumbs-o-down arrowsDown2 text-danger "/>
                                        </span>
                                    </div>
                                </div>
                                <hr/>
                        </div>
                    </div>
                    </div>

                    <div className="col-3">

                        <div id="accordion" className="mb-3">
                            <div className="card shadow-sm">
                                <div className="card-header accordionCard" id="headingOne" data-toggle="collapse"
                                     data-target="#collapseOne" aria-expanded="true"
                                     aria-controls="collapseOne">
                                    <h5 className="mb-0"><i className="fa fa-trophy text-warning"/> <b>Најактивни членови</b></h5>
                                </div>

                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        <div>
                                            <img src={dt} className="rounded-pill img-fluid shadow-sm" width="45px" height="45px"/>
                                            <span className="ml-2">Димитар Трајанов</span>
                                        </div>
                                        <div>
                                            <img src={rs} className="rounded-pill img-fluid shadow-sm" width="45px" height="45px"/>
                                            <span className="ml-2">Ристе Стојанов</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3 bg-light shadow-sm">
                            <div className="card-body">
                            <h5><b>Професори</b></h5>
                            <div className="mb-3">
                                <div>
                                    <img src={dt} className="rounded-pill img-fluid shadow-sm" alt="" width="45px" height="45px"/>
                                    <span className="ml-2">Димитар Трајанов</span>
                                </div>
                                <div>
                                    <img src={rs} className="rounded-pill img-fluid shadow-sm" alt="" width="45px" height="45px"/>
                                    <span className="ml-2">Ристе Стојанов</span>
                                </div>
                            </div>
                            <h5><b>Асистенти</b></h5>
                            <div className="mb-3">
                                <div>
                                    <img src={dt} className="rounded-pill img-fluid shadow-sm" alt="" width="45px" height="45px"/>
                                    <span className="ml-2">Димитар Трајанов</span>
                                </div>
                                <div>
                                    <img alt="" src={rs} className="rounded-pill img-fluid shadow-sm" width="45px" height="45px"/>
                                    <span className="ml-2">Ристе Стојанов</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>

        );
    }


};
export default courseDetails;