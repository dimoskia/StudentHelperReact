import React, {Component} from "react";
import Filters from '../Courses/Filters/Filters';
import Container from '../Courses/Container/Container';
import Pagination from '../Courses/Pagination/Pagination';
import CoursesService from "../../repository/coursesRepository";

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            pagination: {
                PageNumber: 0,
                PageSize: 6,
                TotalPages: 0,
                TotalRecords: 0
            },
            cardView: true,
            searchTerm : "",
            filteringConfirmed : false
        }
    }

    componentDidMount() {
        this.loadCourses();
    }

    loadCourses = (pageNumber = 0, params = null, pageSize = this.state.pagination.PageSize) => {
        console.log("load courses method:");
        console.log(pageNumber, pageSize, params);
        CoursesService.fetchCoursesPaged(pageNumber, pageSize, params).then(response => {
            console.log(response);
            this.setState({
                courses: response.data.Results,
                pagination: {
                    PageNumber: response.data.PageNumber - 1,
                    PageSize: response.data.PageSize,
                    TotalPages: response.data.TotalPages,
                    TotalRecords: response.data.TotalRecords
                }
            });
        });
    };

    searchCourses = (term, pageNumber = 0, pageSize = this.state.pagination.PageSize) => {
        console.log("search courses method:");
        console.log(term, pageNumber, pageSize);
        this.setState({filteringConfirmed : false});
        if (!term || term === "") {
            this.setState({searchTerm : ""});
            this.loadCourses();
        } else {
            CoursesService.searchCourses(term, pageNumber, pageSize).then(response => {
                document.getElementById("filters-form").reset();
                this.setState({
                    courses: response.data.Results,
                    pagination: {
                        PageNumber: response.data.PageNumber - 1,
                        PageSize: response.data.PageSize,
                        TotalPages: response.data.TotalPages,
                        TotalRecords: response.data.TotalRecords
                    },
                    searchTerm : term
                });
            });
        }
    };

    pageChanged = (pageNumber, params) => {
        console.log("pageChanged method:");
        console.log(pageNumber, params);
        if(this.state.searchTerm === "" || !this.state.searchTerm)
            this.loadCourses(pageNumber, params);
        else
            this.searchCourses(this.state.searchTerm, pageNumber);
    };

    applyFilters = params => {
        this.setState({filteringConfirmed : true});
        this.loadCourses(0, params);
    };

    resetFilters = () => {
        this.setState({filteringConfirmed : false});
        this.loadCourses();
    };

    viewChanged = cardView => {
        this.setState({cardView: cardView});
    };

    pageSizeChanged = (pageSize, params) => {
        console.log("page size changed method:");
        console.log(pageSize, params);
        if(this.state.searchTerm === "" || !this.state.searchTerm)
            this.loadCourses(0, params, pageSize);
        else
            this.searchCourses(this.state.searchTerm, this.state.pagination.PageNumber, pageSize);
    };


    render() {
        return (
            <div className="mt-5 container-fluid px-5">
                <div className="row">
                    <Filters
                        applyFilters={this.applyFilters}
                        resetFilters={this.resetFilters}/>
                    <Container courses={this.state.courses}
                               cardView={this.state.cardView}
                               changeView={this.viewChanged}
                               pageSize={this.state.pagination.PageSize}
                               changePageSize={this.pageSizeChanged}
                               totalPages={this.state.pagination.TotalPages}
                               onSearch={this.searchCourses}
                               showPagination={this.state.showPagination}/>
                    <div className="offset-3 col-9 mb-5">
                        <Pagination
                            pageNumber={this.state.pagination.PageNumber}
                            pageSize={this.state.pagination.PageSize}
                            totalPages={this.state.pagination.TotalPages}
                            onPageChange={this.pageChanged}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContainer;