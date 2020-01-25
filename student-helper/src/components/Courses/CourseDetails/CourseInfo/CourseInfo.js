import React from 'react';
import sample from "../../../../images/default_course_image.png";
import sample2 from "../../../../images/course.jpg"

const CourseInfo = (props) =>{

    const getYear = () => {
        const mapYear={
            1: "1-ва година",
            2: "2-ра година",
            3: "3-та година",
            4: "4-та година"
        };
        return <small>{mapYear[props.year]}</small>

    };

    const getProgram = () =>{
        const mapProgram={"ПЕТ": "Примена на е-технологии",
            "КНИ": "Компјутерски науки и инженерство",
            "ПИТ": "Професионални студии по информатички технологии",
            "MT": "Мрежни технологии",
            "КЕ": "Компјутерска едукација",
            "АСИ": "Академски студии по информатика",
            "ИКИ": "Информатика и компјутерско инженерство"
        };
        return(
            <small>{mapProgram[props["program"]]}</small>
        )

    };

    return(
        <div className="col-3">
            <div className="card mb-3 bg-light shadow-sm">
                <img src={props.ImageUrl ? props.ImageUrl : sample} className="card-img-top img-thumbnail" alt=""/>
                <div className="ml-3 mt-2">
                    <ul className="timeline">
                        <li className="timeline-inverted">
                            <div className="timeline-badge bg-primary">
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <span><b>Семестар</b></span>
                                    <br/>
                                    <small>{props.semester}</small>
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
                                    {getYear()}
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
                                    <small>{props.type}</small>
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
                                    {getProgram()}
                                </div>

                            </div>
                        </li>
                    </ul>

                    <div className="pr-3 mb-3">
                        <a className="btn btn-primary btn-block ml-0 text-white"
                           href={props.detailsLink}>Детали</a>
                    </div>
                    <div className="mb-2 pr-2">
                        <h5><b>Опис</b></h5>
                        <p>{props.description} </p>
                    </div>
                </div>
            </div>
        </div>
    )

};
export default CourseInfo;