import React, {Component} from "react";
import Filters from '../Courses/Filters/Filters';
import Container from '../Courses/Container/Container';
import Pagination from '../Courses/Pagination/Pagination';
import CoursesService from "../../repository/coursesRepository";

class MainContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            courses : [],
            PageNumber : 0,
            PageSize : 9,
            TotalPages : 0,
            TotalRecords : 0
        }
    }

    componentDidMount() {
        this.loadCourses();
    }

    loadCourses = (pageNumber = 0, params = null) => {
        CoursesService.fetchCoursesPaged(pageNumber, this.state.PageSize, params).then(response => {
            console.log(response);
            this.setState({
                courses : response.data.Results,
                PageNumber : response.data.PageNumber - 1,
                PageSize : response.data.PageSize,
                TotalPages : response.data.TotalPages,
                TotalRecords : response.data.TotalRecords
            });
        });
    };

    pageChanged = (pageNumber) => {
        this.loadCourses(pageNumber, null);
    };

    applyFilters = (params) => {
      this.loadCourses(0, params);
    };




    render() {
        return (
            <div className="mt-5 container-fluid px-5">
                <div className="row">
                    <Filters
                        applyFilters={this.applyFilters}
                        resetFilters={this.loadCourses}/>
                    <Container courses={this.state.courses}/>
                    <div className="offset-3 col-9 mb-5">
                        <Pagination
                            pageNumber={this.state.PageNumber}
                            pageSize={this.state.PageSize}
                            totalPages={this.state.TotalPages}
                            onPageChange={this.pageChanged}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContainer;