import React, {useState} from "react";
import defaultImage from '../../../../images/default_course_image.png';
import {Link} from "react-router-dom";
import {courseYearToRoman} from "../../../../util/UtilityFunctions";

const CoursesTableRow = (props) => {

    const [inputElem, setInputElem] = useState(null);

    const getPictureUrl = (imageUrl) => {
        if (imageUrl === null) {
            return defaultImage;
        }
        return imageUrl;
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
                <Link to={`/courses/${props.data.Id}`}>
                    {props.data.Title}
                </Link>
            </td>
            <td className="align-middle text-center">
                {courseYearToRoman(props.data.Year)}
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
                <button className="btn btn-sm btn-outline-danger mx-1" onClick={() => props.deleteCourseHanlder(props.data.Id)}>
                    <span className="fa fa-trash"/>&nbsp;Избриши
                </button>
            </td>
        </tr>
    );
};

export default CoursesTableRow;
