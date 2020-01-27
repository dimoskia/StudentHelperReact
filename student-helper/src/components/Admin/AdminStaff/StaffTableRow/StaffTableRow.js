import React, {useState} from "react";
import defaultImage from '../../../../images/default_course_image.png';
import "./StaffTableRow.css";

const StaffTableRow = (props) => {

    const [inputElem, setInputElem] = useState(null);

    const getPictureUrl = (imageUrl) => {
        if (imageUrl === null) {
            return defaultImage;
        }
        return imageUrl;
    };

    return (
        <tr className="StaffTableRow">
            <td className="align-middle text-center">
                <div className="content" onClick={() => inputElem.click()}>
                    <div className="content-overlay rounded rounded-circle"/>
                    <img src={getPictureUrl(props.data.ImageUrl)} alt="Насловна слика за курсот"
                         className="content-image rounded rounded-circle img-fluid"/>
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
                {props.data.FirstName}
            </td>
            <td className="align-middle text-center">
                {props.data.LastName}
            </td>
            <td className="align-middle text-center">
                <a href={props.data.DetailsUrl} target="_blank">
                    {`${props.data.FirstName.toLowerCase()}_${props.data.LastName.toLowerCase()}`}
                </a>
            </td>
            <td className="align-middle text-center">
                <button className="btn btn-sm btn-outline-primary mx-1"
                        onClick={() => {props.updateStaff(props.data.Id); props.removeValidation();}}>
                    <span className="fa fa-edit"/>&nbsp;Ажурирај
                </button>
                <button className="btn btn-sm btn-outline-danger mx-1"
                        onClick={() => props.deleteStaffHandler(props.data.Id)}>
                    <span className="fa fa-trash"/>&nbsp;Избриши
                </button>
            </td>
        </tr>
    );
};

export default StaffTableRow;
