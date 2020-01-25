import React from "react";
import {Link} from "react-router-dom";
import './CardItem.css';
import defaultCourseImage from '../../../../images/default_course_image.png';
import {courseYearToRoman} from "../../../../util/UtilityFunctions";

const CardItem = props => {

    const addToFavouritesHandler = event => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Link to={`/courses/${props.course.Id}`} style={{textDecoration: 'none', color: 'black', width: "33%"}}>
            <div className="CardItem card mb-4 text-center">
                <div className="card-img-overlay p-2">
                    <div className="row">
                        <div className="col-2 offset-9">
                            <button className="heart-link" title="Постави во омилени" onClick={addToFavouritesHandler}>
                                <span className="fa fa-2x fa-star-o text-warning"/>
                            </button>
                        </div>
                    </div>
                </div>
                <img src={props.course.ImageUrl === null ? defaultCourseImage : props.course.ImageUrl}
                     alt={`${props.course.Title}`} className="card-img-top" />
                <div className="card-body course-title">
                    <h5 className="card-title">{props.course.Title}</h5>
                </div>
                <div className="card-footer">
                    <p className="card-text text-muted">{courseYearToRoman(props.course.Year)} година / <span
                        style={{textTransform: "capitalize"}}>{props.course.Semester}</span> семестар</p>
                </div>

            </div>
        </Link>
    );
};

export default CardItem;
