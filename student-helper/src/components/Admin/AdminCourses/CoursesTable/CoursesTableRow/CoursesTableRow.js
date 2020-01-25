import React, {useState} from "react";
import defaultImage from '../../../../../images/default_course_image.png';
import {Link} from "react-router-dom";

const CoursesTableRow = (props) => {

    const [inputElem, setInputElem] = useState(null);

    const getYear = year => {
        switch (year) {
            case 1: return "I";
            case 2: return "II";
            case 3: return "III";
            case 4: return "IV";
            default: return null;
        }
    };

    const getPictureUrl = (imageUrl) => {
        if (imageUrl === null) {
            return defaultImage;
        }
        return imageUrl;
    };

    const deleteCourse = (courseId) => {
        const message = `Дали сте сигурни дека сакате да го избришите курсот ${props.data.Title} со цела негова содржина, вклучувајќи постови и коментари?`;
        if (window.confirm(message)) {
            props.deleteCourseHanlder(courseId);
        }
    };

    return (
        <tr className="CoursesTableRow">
            <td className="align-middle text-center">
                <div className="content" onClick={() => inputElem.click()}>
                    <div className="content-overlay"/>
                    <img src={getPictureUrl(props.data.ImageUrl)} alt="Насловна слика за курсот"
                         className="content-image img-thumbnail img-fluid"/>
                    <div className="content-details fadeIn-bottom">
                        <p className="content-text"><span className="fa fa-lg fa-edit"/></p>
                    </div>
                </div>
                <input ref={input => setInputElem(input)} type="file" accept="image/*"
                       style={{display: 'none'}} onChange={(e) => props.imageHandler(e, props.data.Id)}/>
            </td>
            <td className="align-middle text-center">
                {props.data.Title}
            </td>
            <td className="align-middle text-center">
                {getYear(props.data.Year)}
            </td>
            <td className="align-middle text-center">
                {props.data.Program}
            </td>
            <td className="align-middle text-center">
                {props.data.Semester}
            </td>
            <td className="align-middle text-center">
                <Link to={`/admin/courses/${props.data.Id}/edit`} className="btn btn-sm btn-outline-primary mx-1">
                    <span className="fa fa-edit"/>&nbsp;Ажурирај
                </Link>
                <button className="btn btn-sm btn-outline-danger mx-1" onClick={() => deleteCourse(props.data.Id)}>
                    <span className="fa fa-trash"/>&nbsp;Избриши
                </button>
            </td>
        </tr>
    );
};

export default CoursesTableRow;
