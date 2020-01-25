import React from "react";
import FormSearch from "../FormSearch/FormSearch";
import CardItem from "../CardItem/CardItem";
import ListItem from "../ListItem/ListItem";

const Container = props => {

    let loadCourses = () => {
        return (
            props.courses.map(course => <CardItem key={course.Id} course={course}/>)
        );
    };

    if (!props.cardView) {
        loadCourses = () => {
            return (
                props.courses.map(course => <ListItem key={course.Id} course={course}/>)
            );
        };
    }

    if (props.totalPages === 0) {
        loadCourses = () => {
            return (
                    <div className="text-center mx-auto mt-5">
                        <h1 className="text-muted" style={{fontSize : "80px"}}><i className="fa fa-frown-o"/></h1>
                        <h5 className="text-muted"><i className="fa fa-sm"/>Се извинуваме, но не можевме да најдеме резултати за вашето пребарување</h5>
                    </div>
                );

        };
    }

    return (
        <div className="col-9">
            <div className="container-fluid">
                <FormSearch cardView={props.cardView}
                            changeView={props.changeView}
                            pageSize={props.pageSize}
                            changePageSize={props.changePageSize}
                            onSearch={props.onSearchonSearch}
                            />
                <div className="row">
                    <div className="card-deck align-items-center w-100">
                        {loadCourses()}
                    </div>
                </div>

            </div>
        </div>
    );

};

export default Container;