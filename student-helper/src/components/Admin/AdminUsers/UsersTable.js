import React from "react";
import UsersTableRow from "./UsersTableRow/UsersTableRow";

const UsersTable = (props) => {

    const generateTableHeading = () => {
      return (
          <tr>
              <th scope="col"/>
              <th scope="col" className="text-center">Име</th>
              <th scope="col" className="text-center">Презиме</th>
              <th scope="col" className="text-center">Email</th>
              <th scope="col" className="text-center">Улога</th>
              <th scope="col" className="text-center">Промени улога</th>
          </tr>
      );
    };

    const generateTableBody = () => {
        return props.data.map(item => (
            <UsersTableRow data={item} key={item.Id}
                           promoteUser={props.promoteUser}/>
        ));
    };

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
};

export default UsersTable;