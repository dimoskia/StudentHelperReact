import React from "react";
import {Link} from "react-router-dom";
import './CardItem.css';
import defaultCourseImage from '../../../images/default_course_image.png';

const cardItem = props => {

    const getYear = year => {
        let result;
        switch (year) {
            case 1:
                result = "I";
                break;
            case 2:
                result = "II";
                break;
            case 3:
                result = "III";
                break;
            case 4:
                result = "IV";
                break;
            default:
                result = "Error";
        }
        return result;
    };

    const clickHandler = event => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Link to={`/courses/${props.course.Id}`}
              style={{textDecoration: 'none', color: 'black', width: "33%"}}>
            <div className="card mb-4 CardItem text-center">
                <div className="card-img-overlay p-2">
                    <div className="row">
                        <div className="col-2 offset-9">
                            <button className="heart-link" title="Постави во омилени" onClick={clickHandler}>
                                <span className="fa fa-2x fa-star-o text-light"/>
                            </button>
                        </div>
                    </div>
                </div>
                <img src={props.course.ImageUrl === null ? defaultCourseImage : props.course.ImageUrl} className="card-img-top" alt="..."/>
                <div className="card-body d-flex justify-content-center align-items-center">
                    <h5 className="card-title">{props.course.Title}</h5>
                </div>
                <div className="card-footer">
                    <p className="card-text text-muted">{getYear(props.course.Year)} година / <span
                        style={{textTransform: "capitalize"}}>{props.course.Semester}</span> семестар</p>
                </div>

            </div>
        </Link>
    );
};

export default cardItem;