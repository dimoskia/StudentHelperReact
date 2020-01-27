import React, {Component} from "react";
import Filters from './Filters/Filters';
import CoursesService from "../../../repository/coursesRepository";
import './MainContainer.css';
import ReactPaginate from "react-paginate";
import CardItem from "./CardItem/CardItem";
import ListItem from "./ListItem/ListItem";
import FormSearch from "./FormSearch/FormSearch";

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PageNumber: 1,
            PageSize: 12,
            TotalPages: 0,
            TotalRecords: 0,
            Results: [],
            CardView: true,
            QueryParams: new URLSearchParams(),
            favouriteIds: []
        }
    }

    componentDidMount() {
        this.state.QueryParams.append("favourites", "false");
        const favouriteCoursesIds = JSON.parse(localStorage.getItem("userData")).User.FavouritesIds;
        this.setState({
            favouriteIds: favouriteCoursesIds
        }, () => this.loadCourses());
    }

    loadCourses = () => {
        CoursesService.fetchCoursesPaged(this.state.PageNumber, this.state.PageSize, this.state.QueryParams).then(resp => {
            this.setState(resp.data);
        });
    };

    scrollToTop = () => window.scrollTo(0, 0);

    toggleFavouriteCourse = (courseId) => {
        CoursesService.toggleFavourites(courseId).then(resp => {
            this.setState(prevState => {
                let favouriteIds;
                if (prevState.favouriteIds.includes(courseId)) {
                    favouriteIds = prevState.favouriteIds.filter(id => id !== courseId);
                } else {
                    favouriteIds = [...prevState.favouriteIds, courseId];
                }
                return {favouriteIds};
            });
        });
    };

    showCourses = () => {
        if (this.state.TotalRecords > 0) {
            if (this.state.CardView) {
                return (
                    <div className="card-deck" style={{minHeight: "500px"}}>
                        {this.state.Results.map(course => <CardItem toggleStar={this.toggleFavouriteCourse} favourites={this.state.favouriteIds} key={course.Id} course={course}/>)}
                    </div>
                );
            }
            return (
                <div className="col-12" style={{minHeight: "500px"}}>
                    {this.state.Results.map(course => <ListItem toggleStar={this.toggleFavouriteCourse} favourites={this.state.favouriteIds} key={course.Id} course={course}/>)}
                </div>
            );
        }
        return (
            <div className="text-center mx-auto mt-5" style={{minHeight: 400}}>
                <h1 className="text-muted" style={{fontSize: "80px"}}><i className="fa fa-frown-o"/></h1>
                <h5 className="text-muted"><i className="fa fa-sm"/>Се извинуваме, но не можевме да
                    најдеме резултати за вашето пребарување</h5>
            </div>
        );
    };

    setCardView = (cardView) => {
        if (cardView !== this.state.CardView) {
            this.setState({CardView: cardView});
        }
    };

    changePageSizeHandler = (event) => {
        const newPageSize = parseInt(event.target.value, 10);
        this.setState({
            PageSize: newPageSize,
            PageNumber: 1
        }, () => this.loadCourses());
    };

    changePageHandler = (event) => {
        let newPageNumber = event.selected + 1;
        this.setState({
            PageNumber: newPageNumber
        }, () => {
            this.loadCourses();
            this.scrollToTop();
        });
    };

    searchCoursesHandler = (event) => {
        event.preventDefault();
        const searchTerm = event.target["term"].value;
        this.state.QueryParams.set("searchTerm", searchTerm);
        this.loadCourses();
    };

    toggleFavouritesHandler = () => {
        const oldState = this.state.QueryParams.get("favourites");
        if (oldState === "true") {
            this.state.QueryParams.set("favourites", "false");
        } else {
            this.state.QueryParams.set("favourites", "true");
        }
        this.setState({
            PageNumber: 1
        }, () => this.loadCourses());
    };

    changeFilterHandler = (propName, inputElementsList) => {
        this.state.QueryParams.delete(propName);
        inputElementsList
            .filter(cb => cb.checked)
            .map(cb => cb.value)
            .forEach(val => this.state.QueryParams.append(propName, val));
        this.setState({
            PageNumber: 1
        }, () => this.loadCourses());
    };

    searchResultsInfo = () => {
        if (this.state.QueryParams.get("searchTerm")) {
            return (
                <div className="row mb-2 text-muted">
                    <div className="col-8">
                        <h6>Резултати за пребарување: {this.state.QueryParams.get("searchTerm")}</h6>
                    </div>
                    <div className="col-4 text-right">
                        <h6>Вкупно резултати: {this.state.TotalRecords}</h6>
                    </div>
                </div>
            );
        }
        return (
            <div className="row mb-2 text-muted">
                <div className="col-4 offset-8 text-right">
                    <h6>Вкупно резултати: {this.state.TotalRecords}</h6>
                </div>
            </div>
        );
    };

    pagination = () => {
        if (this.state.TotalRecords > 0) {
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
                               onPageChange={this.changePageHandler}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}
                />
            );
        }
        return null;
    };

    render() {
        return (
            <div className="MainContainer">

                <div className="my-4 container">
                    <div className="row">
                        <div className="col-3 mediaCss">
                            <Filters changeFilters={this.changeFilterHandler}/>
                        </div>

                        <div className="col-9">
                            {/*FormSearch is in a div wit row as well*/}
                            <FormSearch
                                setCardView={this.setCardView}
                                preselectedPageSize={this.state.PageSize}
                                onSearch={this.searchCoursesHandler}
                                toggleFavourites={this.toggleFavouritesHandler}
                                changePageSize={this.changePageSizeHandler}/>

                            {this.searchResultsInfo()}

                            <div className="row">
                                {this.showCourses()}
                            </div>

                            {this.pagination()}

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default MainContainer;
