import React from "react";
import StaffTableRow from "./StaffTableRow/StaffTableRow";

const StaffTable = (props) => {

    const generateTableHeading = () => {
        return (
            <tr>
                <th scope="col"/>
                <th scope="col" className="text-center">Титула</th>
                <th scope="col" className="text-center">Име</th>
                <th scope="col" className="text-center">Презиме</th>
                <th scope="col" className="text-center">Линк за детали</th>
                <th scope="col" className="text-center">Опции</th>
            </tr>
        );
    };

    const generateTableBody = () => {
        return props.data.map(item => (
            <StaffTableRow data={item} key={item.Id} imageHandler={props.imageHandler}/>
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

export default StaffTable;
