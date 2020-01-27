import React, {Component} from 'react';
import CoursesService from "../../../repository/coursesRepository";
import StaffService from '../../../repository/staffRepository'
import $ from 'jquery';

class StaffAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            validation: {
                FirstName: false,
                LastName: false,
                Title: false,
                DetailsUrl: false
            }
        };
    }

    componentDidMount() {
        this.disableEnterKey();
    }

    fileChangedHandler = (e) => {
        if (e.target.files.length) {
            this.setState({image: e.target.files[0]}, () => {
            });
        }
    };

    disableEnterKey = () => {

        $(document).ready(function() {
            $(window).keydown(function(event){
                if(event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });

    };

    onSubmitHandle = (e) => {
        e.preventDefault();

        const isValid = this.state.validation.Title &&
            this.state.validation.FirstName &&
            this.state.validation.LastName &&
            this.state.validation.DetailsUrl;

        const isValid2 = document.getElementById("FirstName").value != "" &&
            document.getElementById("LastName").value != "" &&
            document.getElementById("Title").value != "" &&
            document.getElementById("DetailsUrl").value != "";

        if (this.props.updateStaff && isValid2) {

            const staffData = {
                Id: this.props.updateStaffId,
                FirstName: e.target.FirstName.value,
                LastName: e.target.LastName.value,
                Title: e.target.Title.value,
                DetailsUrl: e.target.DetailsUrl.value
            };

            let flag = false;
            const newValidation = {...this.state.validation}

            Object.entries(staffData).forEach(([key, value]) => {

                if (value == "") {
                    flag = true;
                    newValidation[key] = false;
                    document.getElementById(key).classList.add("is-invalid");
                }
            });

            if (!flag) {

                StaffService.updateStaff(this.props.updateStaffId, staffData).then(resp => {
                    const newData = resp.data;

                    this.props.updateNewData(newData);
                });

                this.props.modalClosed();
                document.getElementById("myForm").reset();

            }

            const newValidRef = {
                FirstName: false,
                LastName: false,
                Title: false,
                DetailsUrl: false
            };

            this.setState({
                image: null,
                validation: newValidRef
            });


        } else {

            this.validateModal();

            const isValid3 = this.state.validation.Title &&
                this.state.validation.FirstName &&
                this.state.validation.LastName &&
                this.state.validation.DetailsUrl;

            if (isValid3) {

                const staffData = {
                    FirstName: e.target.FirstName.value,
                    LastName: e.target.LastName.value,
                    Title: e.target.Title.value,
                    DetailsUrl: e.target.DetailsUrl.value
                };

                const formData = new FormData();
                formData.append("staffData", JSON.stringify(staffData));

                if (this.state.image !== null) {
                    formData.append("image", this.state.image, this.state.image.name);
                }


                this.createStaff(formData);

                this.props.modalClosed();
                document.getElementById("myForm").reset();

                const newValidRef = {
                    FirstName: true,
                    LastName: true,
                    Title: true,
                    DetailsUrl: true
                };

                this.setState({
                    image: null,
                    validation: newValidRef
                });

                this.removeValidation();
            }
        }

    };


    validateModal = () => {

        // const newValidation = {...this.state.validation};
        // Object.entries(newValidation).forEach(([key, value]) => {
        //     if (!value) {
        //         newValidation[key] = false;
        //         document.getElementById(key).classList.add("is-invalid");
        //     } else {
        //         newValidation[key] = true;
        //         document.getElementById(key).classList.remove("is-invalid");
        //     }
        // });
        //
        // this.setState({
        //     validation: newValidation
        // })

        if(document.getElementById("FirstName").value == "")
            document.getElementById("FirstName").classList.add("is-invalid");

        if(document.getElementById("LastName").value == "")
            document.getElementById("LastName").classList.add("is-invalid");

        if(document.getElementById("Title").value == "")
            document.getElementById("Title").classList.add("is-invalid");

        if(document.getElementById("DetailsUrl").value == "")
            document.getElementById("DetailsUrl").classList.add("is-invalid");


    };

    createStaff = (formData) => {
        CoursesService.createStaff(formData).then(response => {

            const newStaff = response.data;

            this.props.addingStaff(newStaff);

        });
    };

    onCancelHandle = () => {

        this.removeValidation();
        this.props.modalClosed();
        document.getElementById("myForm").reset();
        this.setState({
            image: null
        });
    };

    onChangeHandle = (e) => {

        const inputName = e.target.name;
        const inputValue = e.target.value;
        const newValidation = {...this.state.validation};

        if (inputValue.toString().trim().length > 0) {
            document.getElementById(inputName).classList.remove("is-invalid");
            newValidation[inputName] = true;
        } else {
            document.getElementById(inputName).classList.add("is-invalid");
            newValidation[inputName] = false;
        }

        this.setState({
            validation: newValidation
        })

    };

    removeValidation = () => {

        const newValidRef = {
            FirstName: false,
            LastName: false,
            Title: false,
            DetailsUrl: false
        };

        this.setState({
            validation: newValidRef
        });

        document.getElementById("FirstName").classList.remove("is-invalid");
        document.getElementById("LastName").classList.remove("is-invalid");
        document.getElementById("Title").classList.remove("is-invalid");
        document.getElementById("DetailsUrl").classList.remove("is-invalid");

    };

    render() {
        return (

            <form onSubmit={this.onSubmitHandle}
                  id="myForm" className="p-2" >

                <h3 className="text-primary">Внесете вработен</h3>

                <hr></hr>

                <div className="form-group row">
                    <label htmlFor="FirstName" className="col-sm-2 col-form-label"><b>Име</b></label>
                    <div className="col-sm-10">
                        <input type="text" name="FirstName"
                               className="form-control" id="FirstName"
                               onChange={this.onChangeHandle}
                               onBlur={this.onChangeHandle}
                               placeholder="Внесете Име"></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="LastName" className="col-sm-2 col-form-label"><b>Презиме</b></label>
                    <div className="col-sm-10">
                        <input type="text" name="LastName"
                               className="form-control" id="LastName"
                               onChange={this.onChangeHandle}
                               onBlur={this.onChangeHandle}
                               placeholder="Внесете Презиме"></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="Title" className="col-sm-2 col-form-label"><b>Назив</b></label>
                    <div className="col-sm-10">
                        <input type="text" name="Title"
                               className="form-control" id="Title"
                               onChange={this.onChangeHandle}
                               onBlur={this.onChangeHandle}
                               placeholder="Внесете Назив"></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="DetailsUrl" className="col-sm-2 col-form-label"><b>Детали</b></label>
                    <div className="col-sm-10">
                        <input type="text" name="DetailsUrl"
                               className="form-control" id="DetailsUrl"
                               onChange={this.onChangeHandle}
                               onBlur={this.onChangeHandle}
                               placeholder="Внесете Детали"></input>
                    </div>
                </div>

                {this.staffImage()}

                <hr></hr>

                <div className="row">

                    <div className="col">
                    <span
                        onClick={this.onCancelHandle}
                        className="btn btn-danger w-100"><i className="fa fa-times"/> Откажи</span>
                    </div>

                    <div className="col">
                        <button type="submit" className="btn btn-success w-100"><i className="fa fa-save"/> Зачувај
                        </button>
                    </div>

                </div>

            </form>

        );
    }

    staffImage = () => {

        if (this.props.updateStaff) {

        } else {
            return (
                <div className="form-group row">
                    <div className="col-sm-2">
                        <label><b>Слика</b></label>
                    </div>
                    <div className="col-sm-10">
                        <div className="form-group">

                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="ImageUrl"
                                       accept="image/*" name="ImageUrl"
                                       onChange={this.fileChangedHandler}/>
                                <label className="custom-file-label"
                                       htmlFor="ImageUrl">{this.state.image === null ? null : this.state.image.name}</label>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


    }

}

export default StaffAdd;
