import React, {Component} from 'react';
import CoursesService from "../../../repository/coursesRepository";
import StaffService from '../../../repository/staffRepository'

class StaffAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }

    fileChangedHandler = (e) => {
        console.log(e.target.files.length);
        if (e.target.files.length) {
            console.log(e.target.files.length);
            this.setState({image: e.target.files[0]}, () => {
                console.log(this.state.image);
            });
        }
    };

    onSubmitHandle = (e) => {
        e.preventDefault();

        if(this.props.updateStaff){

            const staffData = {
                Id:this.props.updateStaffId,
                FirstName: e.target.FirstName.value,
                LastName: e.target.LastName.value,
                Title: e.target.Title.value,
                DetailsUrl: e.target.DetailsUrl.value
            };


            StaffService.updateStaff(this.props.updateStaffId, staffData).then(resp => {
                const newData = resp.data;

                this.props.updateNewData(newData);
            });

            this.props.modalClosed();
            document.getElementById("myForm").reset();

        } else {
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
        }



    };

    createStaff = (formData) => {
        CoursesService.createStaff(formData).then(response => {

            const newStaff = response.data;

            this.props.addingStaff(newStaff);

        });
    };

    onCancelHandle = () => {
        this.props.modalClosed();
        document.getElementById("myForm").reset();
        this.setState({
            image: null
        });
    };

    render() {
        return (

            <form onSubmit={this.onSubmitHandle} id="myForm" className="p-2">

                <h3 className="text-primary">Внесете вработен</h3>

                <hr></hr>

                <div className="form-group row">
                    <label htmlFor="FirstName" className="col-sm-2 col-form-label"><b>Име</b></label>
                    <div className="col-sm-10">
                        <input type="text" name="FirstName" className="form-control" id="FirstName"
                               placeholder="Внесете Име"></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="LastName" className="col-sm-2 col-form-label"><b>Презиме</b></label>
                    <div className="col-sm-10">
                        <input type="text" name="LastName" className="form-control" id="LastName"
                               placeholder="Внесете Презиме"></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="Title" className="col-sm-2 col-form-label"><b>Назив</b></label>
                    <div className="col-sm-10">
                        <input type="text" name="Title" className="form-control" id="Title"
                               placeholder="Внесете Назив"></input>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="DetailsUrl" className="col-sm-2 col-form-label"><b>Детали</b></label>
                    <div className="col-sm-10">
                        <input type="text" name="DetailsUrl" className="form-control" id="DetailsUrl"
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