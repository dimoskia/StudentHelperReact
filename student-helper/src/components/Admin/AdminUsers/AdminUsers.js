import React, {Component} from "react";
import ManageUsersService from "../../../repository/manageUsersRepository";
import ReactPaginate from "react-paginate";
import UsersTable from "./UsersTable";
import Modal from "../../UI/Modal/Modal";
import ChangeUserRoleModal from "./ChangeUserRoleModal";

class AdminUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PageNumber: 1,
            PageSize: 10,
            TotalPages: 0,
            TotalRecords: 0,
            Results: [],
            QueryParams: new URLSearchParams(),
            promotingUser: false,
            promotingUserId: null
        };
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        ManageUsersService.fetchUsersPaged(this.state.PageNumber, this.state.PageSize, this.state.QueryParams).then(resp => {
            console.log(resp.data);
            this.setState(resp.data);
        });
    };

    handleSearchUsers = (event) => {
        event.preventDefault();
        const term = event.target["term"].value;
        this.state.QueryParams.set("searchTerm", term);
        this.setState({
            PageNumber: 1
        }, () => this.loadUsers());
    };

    searchForm = () => {
        return (
            <form className="mb-4 p-0" onSubmit={this.handleSearchUsers}>
                <div className="p-1 bg-light shadow-sm my-0" style={{padding: "0"}}>
                    <div className="input-group">
                        <input type="search" placeholder="Пребарувај по име или презиме ..."
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

    scrollToTop = () => window.scrollTo(0, 0);

    handlePageChange = (event) => {
        let newPageNumber = event.selected + 1;
        this.setState({
            PageNumber: newPageNumber
        }, () => {
            this.loadUsers();
            this.scrollToTop();
        });
    };

    promoteUserHandler = (userId) => {
        this.setState({
            promotingUser: true,
            promotingUserId: userId
        });
    };

    promoteUserExecution = () => {
        ManageUsersService.promoteUserToAdmin(this.state.promotingUserId, "admin").then(response => {
            const newResultsRef = this.state.Results.filter(user => user.Id !== response.data.Id);
            this.setState({Results: [...newResultsRef, response.data]});
        }).catch(error => console.log(error));
        this.setState({
            promotingUser: false,
            promotingUserId: null
        });
    };

    closeModal = () => {
        this.setState({
            promotingUser: false,
            promotingUserId: null
        });
    };

    mainContent = () => {
        if (this.state.TotalRecords > 0) {
            return (
                <div>
                    <div style={{minHeight: 400}}>
                        <UsersTable
                            data={this.state.Results}
                            promoteUser={this.promoteUserHandler}/>
                    </div>

                    {this.pagination()}
                </div>
            )
                ;
        }
        return (
            <div className="text-center mx-auto mt-5" style={{minHeight: 400}}>
                <h1 className="text-muted" style={{fontSize: "80px"}}><i className="fa fa-frown-o"/></h1>
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
                <h1>Менаџирај корисници</h1>
                <hr/>

                <Modal show={this.state.promotingUser}>
                    <ChangeUserRoleModal
                        user={this.state.Results.map((item) => {
                            if (item.Id === this.state.promotingUserId) {
                                return item.UserDetails.FirstName + " " + item.UserDetails.LastName;
                            }
                            return null;
                        })}
                        modalClosed={this.closeModal}
                        promoteUser={this.promoteUserExecution}
                    />
                </Modal>

                <div className="row">
                    <div className="col-3"/>
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

export default AdminUsers;
