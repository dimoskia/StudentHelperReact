import React from "react";
import CoursesTableRow from "./CoursesTableRow/CoursesTableRow";
import './CoursesTableRow/CoursesTableRow.css';

const CoursesTable = (props) => {

    const generateTableHeading = () => {
        return (
            <tr>
                <th scope="col"/>
                <th scope="col" className="text-center">Назив</th>
                <th scope="col" className="text-center">Година</th>
                <th scope="col" className="text-center">Смер</th>
                <th scope="col" className="text-center">Семестар</th>
                <th scope="col" className="text-center">Опции</th>
            </tr>
        );
    };

    const generateTableBody = () => {
        return props.data.map(item => (
            <CoursesTableRow data={item} key={item.Id}
                             deleteCourseHanlder={props.deleteCourseHanlder}
                             imageHandler={props.imageHandler}/>
        ));
    };

    if (props.data && props.data.length > 0) {
        return (
            <table className="table">
                <thead className="thead-light">
                    {generateTableHeading()}
                </thead>
                <tbody>
                    {generateTableBody()}
                </tbody>
            </table>
        );
    }
    return null;
};

export default CoursesTable;
