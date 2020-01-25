import React, {Component} from 'react';
import "./CourseForm.css";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import CoursesService from "../../../repository/coursesRepository";

class CourseAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allStaff: [],
            defaultStaff : null,
            image: null,
            formData: {
                title: "",
                detailsUrl: "",
                description: ""
            },
            formDataValid: {
                title: false,
                detailsUrl: false,
                description: false,
            }
        };
    }

    componentDidMount() {
        CoursesService.fetchAllStaff().then(response => {
            this.setState({allStaff: response.data,
                                defaultStaff : response.data[0]});
        });
    }


    fileChangedHandler = e => {
        if (e.target.files.length) {
            this.setState({image: e.target.files[0]});
        }
    };

    resetFormHandler = e => {
        this.setState({
            image: null,
            formData: {
                title: "",
                detailsUrl: "",
                description: ""
            },
            formDataValid: {
                title: false,
                detailsUrl: false,
                description: false,
            }
        });
    };

    onFormSubmitHandler = e => {
        e.preventDefault();

        const isFormValid = this.state.formDataValid.title &&
            this.state.formDataValid.detailsUrl &&
            this.state.formDataValid.description;

        if (isFormValid) {
            const courseData = {
                title: e.target.title.value,
                type: e.target.type.value,
                year: e.target.year.value,
                program: e.target.program.value,
                semester: e.target.semester.value,
                detailsUrl: e.target.detailsUrl.value,
                description: e.target.description.value,
                professors: [...e.target.professors.options].filter(p => p.selected).map(p => p.value),
                assistants: [...e.target.assistants.options].filter(a => a.selected).map(a => a.value)
            };
            const formData = new FormData();
            formData.append("courseData", JSON.stringify(courseData));
            if (this.state.image !== null)
                formData.append("image", this.state.image, this.state.image.name);
            this.createCourse(formData);
        }
        else {
            this.validateForm();
        }

    };

    onChangeHandler = e => {
        this.validateInput(e);
    };

    validateInput = e => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        const formData = {...this.state.formData};
        const formDataValid = {...this.state.formDataValid};
        const inputElement = document.getElementById(inputName);
        if(inputValue.length > 0) {
            formDataValid[inputName] = true;
            inputElement.classList.remove("is-invalid");
        }
        else {
            formDataValid[inputName] = false;
            inputElement.classList.add("is-invalid");
        }
        formData[inputName] = inputValue;

        this.setState({
            formData: formData,
            formDataValid: formDataValid
        });
    };

    validateForm = () => {
        const formDataValid = {...this.state.formDataValid};
        Object.entries(formDataValid).forEach(([key, value]) => {
            if(!value) {
                document.getElementById(key).classList.add("is-invalid");
            }
        });
    };

    createCourse = (formData) => {
        CoursesService.createCourse(formData).then(response => {
            this.props.history.push("/admin/courses");
        });
    };

    staffOptions = () => {
        return (
            this.state.allStaff.map((staffMember, index) => <option key={staffMember.Id}
                                                           value={staffMember.Id}>{staffMember.Name}</option>)
        );
    };


    render() {
        return (
            <div className="courseAdd row w-100 my-4">
                <div className="col-8 mx-auto my-4">
                    <div className="my-auto card cardAdd px-3">
                        <form className="p-4" onSubmit={this.onFormSubmitHandler}>
                            <div className="row">
                                <h1 className="text-primary ml-3 font-italic my-0">Додади курс</h1>
                            </div>
                            <hr className="mb-4"/>
                            <div className="row">
                                <div className="col-6">
                                    {this.courseName()}
                                    {this.courseYear()}
                                    {this.courseSemester()}
                                    {this.courseStatus()}
                                    {this.courseProgram()}
                                    {this.courseImage()}
                                    {this.courseDetails()}
                                    {this.courseDescription()}
                                </div>
                                <div className="col-6">
                                    {this.courseProfessors()}
                                    {this.courseAssistants()}
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-4">
                                    <Link to="/" className="btn btn-block btn-danger"><i
                                        className="fa fa-times"/> Откажи</Link>
                                </div>
                                <div className="col-4 text-center">
                                    <button type="reset" className="btn btn-block btn-warning text-white" onClick={this.resetFormHandler}><i
                                        className="fa fa-undo"/> Ресетирај
                                    </button>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-block btn-success"><i
                                        className="fa fa-save"/> Зачувај
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        );
    };

    courseName = () => {
        return (
            <div className="form-group">
                <div className="row mb-3">
                    <div className="col-3 text-right">
                        <label><b>Назив</b></label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control inputText" id="title"
                               placeholder="Внесете назив на курс" name="title" value={this.state.formData.title}
                               onChange={this.onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        )
    };

    courseYear = () => {
        return (
            <div className="row mb-3">
                <div className="col-3 text-right">
                    <b>Година</b>
                </div>
                <div className="col-9">
                    <select name="year" className="form-control custom-select">
                        <option value="1">1-ва година</option>
                        <option value="2">2-ра година</option>
                        <option value="3">3-та година</option>
                        <option value="4">4-та година</option>
                    </select>
                </div>
            </div>
        );
    };

    courseSemester = () => {
        return (
            <div className="row mb-3">
                <div className="col-3 text-right">
                    <b>Семестар</b>
                </div>
                <div className="col-9">
                    <div className="custom-control custom-radio d-inline">
                        <input type="radio" className="custom-control-input" id="winter"
                               name="semester" defaultChecked value="Зимски"/>
                        <label className="custom-control-label" htmlFor="winter">Зимски</label>
                    </div>
                    <div className="custom-control ml-3 custom-radio d-inline">
                        <input type="radio" className="custom-control-input" id="summer"
                               name="semester" value="Летен"/>
                        <label className="custom-control-label" htmlFor="summer">Летен</label>
                    </div>
                </div>
            </div>
        );
    };

    courseStatus = () => {
        return (
            <div className="row mb-3">
                <div className="col-3 text-right">
                    <b>Статус</b>
                </div>
                <div className="col-9">
                    <div className="custom-control d-inline custom-radio">
                        <input type="radio" className="custom-control-input" id="mandatory"
                               name="type" defaultChecked value="задолжителен"/>
                        <label className="custom-control-label"
                               htmlFor="mandatory">Задолжителен</label>
                    </div>
                    <div className="custom-control ml-3 d-inline custom-radio">
                        <input type="radio" className="custom-control-input" id="elective"
                               name="type" value="изборен"/>
                        <label className="custom-control-label"
                               htmlFor="elective">Изборен</label>
                    </div>
                </div>
            </div>
        );
    };

    courseProgram = () => {
        return (
            <div className="form-group">
                <div className="row mb-2">
                    <div className="col-3 text-right">
                        <label><b>Смер</b></label>
                    </div>
                    <div className="col-9">
                        <select className="form-control custom-select" name="program">
                            <option value="КНИ">Компјутерски науки и инженерство</option>
                            <option value="ПЕТ">Примена на е-технологии</option>
                            <option value="МТ">Мрежни технологии</option>
                            <option value="КЕ">Компјутерска едукација</option>
                            <option value="ИКИ">Информатика и компјутерско инженерство</option>
                            <option value="АСИ">Академски студии по информатика</option>
                            <option value="ПИТ">Професионални студии по информатички технологии
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        );
    };

    courseImage = () => {
        return (
            <div className="row">
                <div className="col-3 text-right">
                    <label><b>Слика</b></label>
                </div>
                <div className="col-9">
                    <div className="form-group">

                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile"
                                   accept="image/*" name="image"
                                   onChange={this.fileChangedHandler}
                            />
                            <label className="custom-file-label"
                                   htmlFor="customFile">{this.state.image === null ? null : this.state.image.name}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    courseDetails = () => {
        return (
            <div className="row mb-3">
                <div className="col-3 text-right">
                    <label><b>Детали</b></label>
                </div>
                <div className="col-9">
                    <input type="text" name="detailsUrl" className="form-control" id="detailsUrl"
                           placeholder="Поставете линк за детали" value={this.state.formData.detailsUrl}
                           onChange={this.onChangeHandler}/>
                </div>
            </div>
        );
    };

    courseDescription = () => {
        return (
            <div className="row mb-3">
                <div className="col-3 text-right">
                    <label> <b>Опис</b></label>
                </div>
                <div className="col-9">
                    <textarea name="description" rows="2" className="form-control" id="description" style={{resize : "none"}}
                              placeholder="Внесете опис" value={this.state.formData.description}
                              onChange={this.onChangeHandler}/>
                </div>
            </div>
        );
    };

    courseProfessors = () => {
        let result = null;
        if(this.state.defaultStaff !== null) {
            result = (
                <div className="row mb-2">
                    <div className="col-3 text-right">
                        <label><b>Професори</b></label>
                    </div>
                    <div className="col-9 teachers" id="teacher">
                        <select className="form-control" multiple size="8" name="professors" defaultValue={[this.state.defaultStaff.Id]}>
                            {this.staffOptions()}
                        </select>
                    </div>
                </div>
            );
        }
        return result;
    };

    courseAssistants = () => {
        let result = null;
        if(this.state.defaultStaff !== null) {
            result = (
                <div className="row mb-2 mt-3">
                    <div className="col-3 text-right">
                        <label><b>Асистенти</b></label>
                    </div>
                    <div className="col-9">
                        <select className="form-control" multiple size="8" name="assistants" defaultValue={[this.state.defaultStaff.Id]}>
                            {this.staffOptions()}
                        </select>
                    </div>
                </div>
            );
        }
        return result;
    };

}

export default withRouter(CourseAdd);


