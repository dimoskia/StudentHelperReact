import React from "react";
import defaultImage from "../../../../images/user_image.png";
import "./UsersTableRow.css";

const UsersTableRow = (props) => {

    const getPictureUrl = (imageUrl) => {
        if (imageUrl === null) {
            return defaultImage;
        }
        return imageUrl;
    };

    return (
        <tr className="UsersTableRow">
            <td className="align-middle text-center">
                <div className="content">
                    <img src={getPictureUrl(props.data.UserDetails.ImageUrl)} alt="Слика на корисникот"
                         className="content-image rounded rounded-circle img-fluid"/>
                </div>
            </td>
            <td className="align-middle text-center">
                {props.data.UserDetails.FirstName}
            </td>
            <td className="align-middle text-center">
                {props.data.UserDetails.LastName}
            </td>
            <td className="align-middle text-center">
                {props.data.Email}
            </td>
            <td className="align-middle text-center">
                {props.data.Role}
            </td>

            <td className="align-middle text-center">
                <button className="btn btn-sm btn-outline-danger mx-1" disabled={props.data.Role === "admin"}
                        onClick={() => props.promoteUser(props.data.Id)}>
                    <span className="fa fa-arrow-up"/>&nbsp;Унапреди во admin&nbsp;
                </button>
            </td>
        </tr>
    );

};

export default UsersTableRow;