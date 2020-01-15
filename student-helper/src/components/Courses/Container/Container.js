import React, {Component} from "react";
import FormSearch from "../FormSearch/FormSearch";

class Container extends Component{

    render() {
        return (
            <div className="col-9">
                <FormSearch/>
                <div className="row CourseItems">

                </div>
                {/*to do: map Courses funkcija*/}
                {/*to do: Pagination*/}
            </div>
        );
    }
}

export default Container;