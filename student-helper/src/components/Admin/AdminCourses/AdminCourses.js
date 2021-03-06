import React, {Component} from "react";
import CoursesService from "../../../repository/coursesRepository";
import CoursesTable from "./CoursesTable";
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import ModalDelete from "../../UI/ModalDelete/ModalDelete";
import DeleteElement from "../../DeleteElementModal/DeleteElement";

class AdminCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PageNumber: 1,
            PageSize: 10,
            TotalPages: 0,
            TotalRecords: 0,
            Results: [],
            QueryParams: new URLSearchParams(),
            deletedCourseId:null,
            delCourse: false
        };
    }

    componentDidMount() {
        this.loadCourses();
    }

    deleteCourseCancelHandler = () => {
        this.setState({delCourse:false})
    };

    scrollToTop = () => window.scrollTo(0, 0);

    loadCourses = () => {
        CoursesService.fetchCoursesPaged(this.state.PageNumber, this.state.PageSize, this.state.QueryParams).then(resp => {
            this.setState(resp.data);
        });
    };

    handlePageChange = (event) => {
        let newPageNumber = event.selected + 1;
        this.setState({
            PageNumber: newPageNumber
        }, () => {
            this.loadCourses();
            this.scrollToTop();
        });
    };

    handleSearchCourses = (event) => {
        event.preventDefault();
        const term = event.target["term"].value;
        this.state.QueryParams.set("searchTerm", term);
        this.setState({
            PageNumber: 1
        }, () => this.loadCourses());
    };

    handleImageChange = (event, courseId) => {
        if (event.target.files.length) {
            const formData = new FormData();
            formData.append("newImage", event.target.files[0], null);
            CoursesService.changeCourseImage(courseId, formData).then(resp => {
                const newImageUrl = resp.data.ImageUrl;
                const newCoursesRef = this.state.Results.map(course => {
                    if (course.Id === courseId) {
                        course.ImageUrl = newImageUrl;
                    }
                    return course;
                });
                this.setState({Results: newCoursesRef});
            });
        }
    };

    deleteCourse = (courseId) => {

            this.setState({
                delCourse:true,
                deletedCourseId:courseId
            });

    };

    deleteCourseExecution = (courseId) => {

        CoursesService.deleteCourse(courseId).then(resp => {
            if (this.state.PageNumber === this.state.TotalPages) {
                if (this.state.Results.length === 1) {
                    this.setState(prevState => {
                        const newPageNumber = prevState.PageNumber - 1;
                        return {
                            PageNumber: Math.max(newPageNumber, 0)
                        };
                    }, () => this.loadCourses());
                } else {
                    this.setState(prevState => {
                        const newCoursesRef = prevState.Results.filter(course => course.Id !== courseId);
                        return {Results: newCoursesRef};
                    });
                }
            } else {
                this.loadCourses();
            }
        });

        this.setState({delCourse:false});

    };



    searchForm = () => {
        return (
            <form className="mb-4 p-0" onSubmit={this.handleSearchCourses}>
                <div className="p-1 bg-light shadow-sm my-0" style={{padding: "0"}}>
                    <div className="input-group">
                        <input type="search" placeholder="Пребарувај по име на курс ..."
                               aria-describedby="button-addon1"
                               className="form-control border-0 bg-light"
                               name="term"
                               id="search-input"/>
                        <div className="input-group-append">
                            <button id="button-addon1" type="submit" className="btn btn-light text-primary"
                                    title="Пребарај"><i className="fa fa-search"/></button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };

    searchResultsInfo = () => {
        if (this.state.QueryParams.get("searchTerm")) {
            return (
                <div className="row mb-2">
                    <div className="col-8">
                        <h6>Резултати за пребарување: {this.state.QueryParams.get("searchTerm")}</h6>
                    </div>
                    <div className="col-4 text-right">
                        <h6>Вкупно резултати: {this.state.TotalRecords}</h6>
                    </div>
                </div>
            );
        }
        return null;
    };

    mainContent = () => {
        if (this.state.TotalRecords > 0) {
            return (
                <div>

                    <div style={{minHeight: 300}}>
                        <CoursesTable data={this.state.Results}
                                      deleteCourseHanlder={this.deleteCourse}
                                      imageHandler={this.handleImageChange}/>
                    </div>

                    {this.pagination()}
                </div>
            );
        }
        return (
            <div className="text-center mx-auto mt-5" style={{minHeight: 400}}>
                <h1 className="text-muted" style={{fontSize : "80px"}}><i className="fa fa-frown-o"/></h1>
                <h5 className="text-muted"><i className="fa fa-sm"/>Се извинуваме, но не можевме да
                    најдеме резултати за вашето пребарување</h5>
            </div>
        );
    };

    pagination = () => {
        return (
            <ReactPaginate previousLabel={<span className="fa fa-angle-double-left"/>}
                           nextLabel={<span className="fa fa-angle-double-right"/>}
                           breakLabel={<span className="gap">...</span>}
                           breakClassName={"break-me"}
                           pageCount={this.state.TotalPages}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           pageClassName={"page-item"}
                           pageLinkClassName={"page-link"}
                           previousClassName={"page-item"}
                           nextClassName={"page-item"}
                           previousLinkClassName={"page-link"}
                           nextLinkClassName={"page-link"}
                           forcePage={this.state.PageNumber - 1}
                           onPageChange={this.handlePageChange}
                           containerClassName={"pagination justify-content-center"}
                           activeClassName={"active"}
            />
        );
    };

    render() {
        return (
            <div className="container my-4">
                <h1>Менаџирај курсеви</h1>
                <hr/>
                <ModalDelete show={this.state.delCourse}>

                    <DeleteElement modalClosed={this.deleteCourseCancelHandler}
                                  title={this.state.Results.map((item) => {
                                        if(item.Id == this.state.deletedCourseId){
                                            return item.Title
                                        }
                                  })}
                                  whatToDelete={"курсот "}
                                  deleteCourse={this.deleteCourseExecution}
                                  deletedId={this.state.deletedCourseId}/>

                </ModalDelete>

                <div className="row">
                    <div className="col-3">
                        <Link to='/admin/courses/add' className="btn btn-primary btn-lg">
                            <span className="fa fa-plus"/>&nbsp;Додади курс
                        </Link>
                    </div>
                    <div className="col-5 offset-4 text-right">
                        {this.searchForm()}
                    </div>
                </div>

                {this.searchResultsInfo()}

                {this.mainContent()}
            </div>
        );
    }
}

export default AdminCourses;
