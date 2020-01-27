import React, {Component} from "react";
import StaffService from "../../../repository/staffRepository";
import ReactPaginate from "react-paginate";
import StaffTable from "./StaffTable";
import Modal from "../../UI/Modal/Modal";
import StaffAdd from "../../Staffs/StaffAdd/StaffAdd";
import DeleteElement from "../../DeleteElementModal/DeleteElement";
import ModalDelete from "../../UI/ModalDelete/ModalDelete";

class AdminStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PageNumber: 1,
            PageSize: 10,
            TotalPages: 0,
            TotalRecords: 0,
            Results: [],
            QueryParams: new URLSearchParams(),
            addingStaff: false,
            deleteStaffId: null,
            delStaff: false,
            updateStaff: false,
            updateStaffId: null
        };
    }

    componentDidMount() {
        this.loadStaff();
    }

    loadStaff = () => {
        StaffService.fetchStaffPaged(this.state.PageNumber, this.state.PageSize, this.state.QueryParams).then(resp => {
            this.setState(resp.data);
        });
    };

    addStaffHandler = () => {

        this.setState({addingStaff: true})

    };

    addStaffCancelHandler = () => {
        this.setState({
            updateStaff: false,
            addingStaff: false
        })

    };

    addStaff = (newStaff) => {

        this.setState({
            updateStaff: false,
            PageNumber: 1
        }, () => this.loadStaff());

    };

    deleteStaffCancelHandler = () => {
        this.setState({delStaff: false})
    };

    deleteStaff = (staffId) => {

        this.setState({
            delStaff: true,
            deleteStaffId: staffId
        });

    };

    deleteStaffExecution = (staffId) => {

        StaffService.deleteStaff(staffId).then(resp => {
            if (this.state.PageNumber === this.state.TotalPages) {
                if (this.state.Results.length === 1) {
                    this.setState(prevState => {
                        const newPageNumber = prevState.PageNumber - 1;
                        return {
                            PageNumber: Math.max(newPageNumber, 0)
                        };
                    }, () => this.loadStaff());
                } else {
                    this.setState(prevState => {
                        const newStaffsRef = prevState.Results.filter(staff => staff.Id !== staffId);
                        return {Results: newStaffsRef};
                    });
                }
            } else {
                this.loadStaff();
            }
        });

        this.setState({delStaff: false});

    };

    removeValidation = () => {
        document.getElementById("FirstName").classList.remove("is-invalid");
        document.getElementById("LastName").classList.remove("is-invalid");
        document.getElementById("Title").classList.remove("is-invalid");
        document.getElementById("DetailsUrl").classList.remove("is-invalid");
    };

    updateStaff = (staffId) => {

        const staff = StaffService.getStaff(staffId).then(resp => {

            this.setState({
                updateStaff: true,
                addingStaff: true,
                updateStaffId: staffId
            });

            this.setStaffData(resp.data);

        });

    };

    setStaffData = (data) => {

        document.getElementById("FirstName").value = data.FirstName;
        document.getElementById("LastName").value = data.LastName;
        document.getElementById("Title").value = data.Title;
        document.getElementById("DetailsUrl").value = data.DetailsUrl;

    };

    updateNewData = (newData) => {

        this.setState((prevState) => {
            const newStaffsRef = prevState.Results.map((item) => {
                if (item.Id === newData.Id) {
                    return newData;
                }

                return item;
            });

            return{"Results": newStaffsRef}
        })

    };

    scrollToTop = () => window.scrollTo(0, 0);

    handlePageChange = (event) => {
        let newPageNumber = event.selected + 1;
        this.setState({
            PageNumber: newPageNumber
        }, () => {
            this.loadStaff();
            this.scrollToTop();
        });
    };

    handleSearchCourses = (event) => {
        event.preventDefault();
        const term = event.target["term"].value;
        this.state.QueryParams.set("searchTerm", term);
        this.setState({
            PageNumber: 1
        }, () => this.loadStaff());
    };

    handleImageChange = (event, staffId) => {
        if (event.target.files.length) {
            const formData = new FormData();
            formData.append("newImage", event.target.files[0], null);
            StaffService.changeStaffImage(staffId, formData).then(resp => {
                const newImageUrl = resp.data.ImageUrl;
                const newStaffRef = this.state.Results.map(staff => {
                    if (staff.Id === staffId) {
                        staff.ImageUrl = newImageUrl;
                    }
                    return staff;
                });
                this.setState({Results: newStaffRef});
            });
        }
    };

    searchForm = () => {
        return (
            <form className="mb-4 p-0" onSubmit={this.handleSearchCourses}>
                <div className="p-1 bg-light shadow-sm my-0" style={{padding: "0"}}>
                    <div className="input-group">
                        <input type="search" placeholder="Пребарувај по име име или презиме ..."
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
                        <StaffTable data={this.state.Results}
                                    deleteStaffHandle={this.deleteStaff}
                                    updateStaff={this.updateStaff}
                                    removeValidation={this.removeValidation}
                                    imageHandler={this.handleImageChange}/>
                    </div>

                    {this.pagination()}
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
                <h1>Менаџирај наставен кадар</h1>
                <hr/>

                <Modal show={this.state.addingStaff}>
                    <StaffAdd addingStaff={this.addStaff}
                              updateNewData={this.updateNewData}
                              updateStaffId={this.state.updateStaffId}
                              updateStaff={this.state.updateStaff}
                              modalClosed={this.addStaffCancelHandler}/>
                </Modal>

                <ModalDelete show={this.state.delStaff}>

                    <DeleteElement modalClosed={this.deleteStaffCancelHandler}
                                   title={this.state.Results.map((item) => {
                                       if (item.Id == this.state.deleteStaffId) {
                                           return item.FirstName + " " + item.LastName;
                                       }
                                   })}
                                   whatToDelete={"вработениот"}
                                   deleteStaff={this.deleteStaffExecution}
                                   deletedId={this.state.deleteStaffId}/>

                </ModalDelete>

                <div className="row">
                    <div className="col-3">
                        <button onClick={this.addStaffHandler} className="btn btn-primary btn-lg">
                            <span className="fa fa-plus"/>&nbsp;Додади вработен
                        </button>
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

export default AdminStaff;
