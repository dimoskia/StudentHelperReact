import React from "react";
import {Link} from "react-router-dom";
import './ListItem.css';

const ListItem = props => {

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
              style={{textDecoration: 'none', color: 'black', maxHeight : "160", maxWidth : "92%"}}>
            <div className="card mb-3 ListItem mr-5 mx-5">
                <div className="card-img-overlay p-2">
                    <div className="row">
                        <div className="col-2 offset-9">
                            <button className="heart-link" title="Постави во омилени" onClick={clickHandler}>
                                <span className="fa fa-2x fa-star-o text-light"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={props.course.ImageUrl} className="card-img h-100" alt="..."/>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.course.Title}</h5>
                            <p className="card-text text-muted mt-2">{getYear(props.course.Year)} година / <span
                                style={{textTransform: "capitalize"}}>{props.course.Semester}</span> семестар</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ListItem;