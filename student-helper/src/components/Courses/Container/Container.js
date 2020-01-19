import React from "react";
import FormSearch from "../FormSearch/FormSearch";
import CardItem from "../CardItem/CardItem";

const container = props => {

    const loadCards = () => {
      return (
          props.courses.map(course => <CardItem key={course.Id} course={course}/>)
      );
    };

        return (
            <div className="col-9">
                <div className="container-fluid px-5">
                    <FormSearch/>
                    <div className="row">
                        <div className="card-deck align-items-center">
                            {loadCards()}
                        </div>
                    </div>

                </div>
                {/*to do: Pagination*/}
            </div>
        );

}

export default container;