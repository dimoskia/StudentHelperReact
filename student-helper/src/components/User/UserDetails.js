import React, {Component} from "react";
import UserPrivacy from "./UserPrivacy/UserPrivacy";
import "./UserDetails.css"
import course_image from "../../images/default_course_image.png";
import UsersService from "../../repository/userRepository";
import ReactPaginate from "react-paginate";
import CoursesService from "../../repository/coursesRepository";
import {Link} from "react-router-dom";


class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param: this.props.match.params,
            user: {
                UserDetails: {
                    FirstName: "",
                    LastName: "",
                    ImageUrl: null
                }
            },
            favouriteCourses: [],
            PageNumber: 1,
            PageSize: 4,
            TotalPages: 0,
            QueryParams: new URLSearchParams()
        }

    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        const userData = JSON.parse(localStorage.getItem("userData")).User;
        this.setState({
            user: userData
        });
        this.loadFavourites();
    };

    loadFavourites = () => {
        CoursesService.getAllFavourites(this.state.PageNumber, this.state.PageSize,this.state.QueryParams).then(data => {
            this.setState({
                favouriteCourses: data.data.Results,
                TotalPages: data.data.TotalPages
            });
        });
    };

    changeFirstName = (e) => {
        const newValue = e.target.value;
        this.setState(prevState => ({
            user: {
                UserDetails: {
                    ...prevState.user.UserDetails,
                    FirstName: newValue
                }
            }
        }));
    };

    handleImageChange = (event) => {
        if (event.target.files.length) {
            const formData = new FormData();
            formData.append("newImage", event.target.files[0], null);
            UsersService.changeUserImage(formData).then(resp => {
                this.setState(user => ({
                    ...user,
                    user: {
                        UserDetails: resp.data
                    }
                }));
                const userData = JSON.parse(localStorage.getItem('userData'));
                userData.User.UserDetails = resp.data;
                localStorage.setItem('userData', JSON.stringify(userData));
            });
        }
    };

    changePageHandler = (event) => {
        let newPageNumber = event.selected + 1;
        this.setState({
            PageNumber: newPageNumber
        }, () => {
            this.loadFavourites();
        });
    };

    changeLastName = (e) => {
        const newValue = e.target.value;
        this.setState(prevState => ({
            user: {
                UserDetails: {
                    ...prevState.user.UserDetails,
                    LastName: newValue
                }
            }
        }));
    };

    deleteCourseFromFavourites = (courseId) => {
        CoursesService.toggleFavourites(courseId).then(response => {
            if (this.state.PageNumber === this.state.TotalPages) {
                if (this.state.favouriteCourses.length === 1) {
                    this.setState(prevState => {
                        const newPageNumber = prevState.PageNumber - 1;
                        return {
                            PageNumber: Math.max(newPageNumber, 0)
                        };
                    }, () => this.loadFavourites());
                } else {
                    const favouriteCourses = this.state.favouriteCourses.filter(course => course.Id !== courseId);
                    this.setState({favouriteCourses});
                }
            } else {
                this.loadFavourites();
            }

            const favouriteCourses = this.state.favouriteCourses.filter(course => course.Id !== courseId);

            const userData = JSON.parse(localStorage.getItem("userData"));
            userData.User.FavouritesIds = favouriteCourses.map(c => c.Id);
            localStorage.setItem("userData", JSON.stringify(userData));

            this.setState({favouriteCourses});
        });
    };

    loadFavouriteCoursesShow = () => {
        return this.state.favouriteCourses.map(course => {
            return (
                <tr key={course.Id}>
                    <td className="text-center"><img alt="" src={course.ImageUrl === null ? course_image : course.ImageUrl}
                                                     width="70px" height="45px" className="shadow-sm"/></td>
                    <td className="my-auto align-middle"><Link to={`/courses/${course.Id}`}>{course.Title}</Link></td>
                    <td className="text-center">
                        <button className="btn" onClick={() => this.deleteCourseFromFavourites(course.Id)}><i
                            className="fa fa-times text-danger"/></button>
                    </td>
                </tr>
            );
        });
    };

    paginationShow = () => {
        if (this.state.favouriteCourses.length > 0) {
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
    };

    submitChangeForm = (e,firstName,LastName) =>{
        e.preventDefault();
        UsersService.changeUserInfo(firstName,LastName).then(response => {
            this.setState(user => ({
                ...user,
                user: {
                    UserDetails: response.data
                }
            }));
            const userData = JSON.parse(localStorage.getItem('userData'));
            userData.User.UserDetails = response.data;
            localStorage.setItem('userData', JSON.stringify(userData));
        });
    };

    render() {
        return (
            <div className="container containerForm mb-2 UserInfo">
                <div className="row mt-3">
                    <div className="col">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2><i className="fa fa-user text-primary"/> Мој профил</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row h-100">
                    <UserPrivacy imgUrl={this.state.user.UserDetails.ImageUrl}
                                 imageHandler={this.handleImageChange}
                                 deactivateUserFrom={this.props.deactivateUserFromPrivacy}
                    />
                    <div className="col-9 mt-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="one-tab" data-toggle="tab" href="#one"
                                           role="tab"
                                           aria-controls="One" aria-selected="true"><i
                                            className="fa fa-user text-primary"/><b> Лични податоци</b></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab"
                                           aria-controls="Two" aria-selected="false"><i
                                            className="fa fa-star text-warning"/><b> Омилени курсеви</b></a>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active p-3" id="one" role="tabpanel"
                                     aria-labelledby="one-tab">
                                    <form className="my-auto" onSubmit={(e)=>this.submitChangeForm(e,this.state.user.UserDetails.FirstName,this.state.user.UserDetails.LastName)}>
                                        <div className="row mx-5 my-3">
                                            <div className="col-3 text-right my-auto"><b>Име</b></div>
                                            <div className="col-7">
                                                <input type="text" className="form-control"
                                                       onChange={(e) => this.changeFirstName(e)}
                                                       value={this.state.user.UserDetails.FirstName}/>
                                            </div>
                                        </div>
                                        <div className="row mx-5 mt-4">
                                            <div className="col-3 text-right my-auto"><b>Презиме</b></div>
                                            <div className="col-7">
                                                <input type="text" className="form-control"
                                                       onChange={(e) => this.changeLastName(e)}
                                                       value={this.state.user.UserDetails.LastName}/>
                                            </div>
                                        </div>
                                        <div className="row mx-5 mt-4">
                                            <div className="col-3 text-right my-auto"><b>Email</b></div>
                                            <div className="col-7">
                                                <input type="text" className="form-control emailInput"
                                                       value={this.state.user.Email} disabled/>
                                            </div>
                                        </div>
                                        <div className="row mx-5 mt-4">
                                            <div className="col-3 text-right my-auto"><b>Опис</b></div>
                                            <div className="col-7">
                                                <textarea className="form-control" rows="4"/>
                                            </div>
                                        </div>
                                        <div className="row mx-5 mt-4">
                                            <div className="col-4 offset-4 text-center">
                                                <button className="btn btn-primary btn-block" type="submit" data-toggle="modal" data-target="#modalSuccess">Промени</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade p-30" id="two" role="tabpanel" aria-labelledby="two-tab">
                                    <div className="tableFavourites">
                                    <table className="table border-top-0">
                                        <thead className="border-top-0">
                                        <tr className="border-top-0">
                                            <th className="text-center border-top-0">Слика</th>
                                            <th className="border-top-0">Назив</th>
                                            <th className="text-center border-top-0">Отстрани</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.loadFavouriteCoursesShow()}
                                        </tbody>
                                    </table>
                                    </div>
                                    {this.paginationShow()}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalSuccess" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h4 className="modal-title text-success">Промена на лични податоци</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                Успешно ги променивте вашите лични податоци.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default UserDetails;
