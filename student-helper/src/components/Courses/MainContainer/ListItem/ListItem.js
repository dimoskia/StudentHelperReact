import React from "react";
import {Link} from "react-router-dom";
import './ListItem.css';
import defaultCourseImage from '../../../../images/default_course_image.png';
import {truncate} from "../../../../util/UtilityFunctions";
import {courseYearToRoman} from "../../../../util/UtilityFunctions";

const ListItem = props => {

    const addToFavouritesHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        props.toggleStar(props.course.Id);
    };

    return (
        <Link to={`/courses/${props.course.Id}`} style={{textDecoration: 'none', color: 'black'}}>


            <div className="ListItem card mb-3">
                <div className="row no-gutters">
                    <div className="col-3">
                        <div className="card-img-overlay p-2">
                            <div className="row">
                                <div className="col-4 offset-8 text-right">
                                    <button className="heart-link" title="Постави во омилени" onClick={addToFavouritesHandler}>
                                        <span className={`fa fa-2x ${props.favourites.includes(props.course.Id) ? 'fa-star': 'fa-star-o'} text-warning`}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <img src={props.course.ImageUrl === null ? defaultCourseImage : props.course.ImageUrl}
                             className="card-img" style={{height : "160px"}} alt={props.course.Title}/>
                    </div>
                    <div className="col-9" style={{height : "160px"}}>
                        <div className="card-body">
                            <h5 className="card-title my-0">{props.course.Title}</h5>
                            <p className="card-text text-muted mt-0 mb-1">({courseYearToRoman(props.course.Year)} година / <span
                                style={{textTransform: "capitalize"}}>{props.course.Semester}</span> семестар)</p>
                            <div className="text-justify">
                                <small className="card-text">{truncate(props.course.Description, 290)}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </Link>
    );
};

export default ListItem;
