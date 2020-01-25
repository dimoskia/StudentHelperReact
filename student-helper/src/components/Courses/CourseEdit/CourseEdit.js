import React, {Component} from 'react';
import "../CourseAdd/CourseForm.css";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import CoursesService from "../../../repository/coursesRepository";

class CourseEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allStaff: [],
            course: {},
            initialCourse: {},
            winterSemesterChecked: false,
            mandatoryCourseChecked: false,
            defaultStaff: false,
            formDataValid: {
                Title: true,
                DetailsUrl: true,
                Description: true,
            }
        };
    }

    componentDidMount() {
        CoursesService.fetchAllStaff().then(response => {
            this.setState({
                allStaff: response.data
            });
        });

        this.getCourse();

    }

    getCourse = () => {
        CoursesService.getCourse(this.props.match.params.courseId).then(response => {
            this.setState({
                course: response.data,
                initialCourse: response.data,
                winterSemesterChecked: response.data.Semester === "Зимски",
                mandatoryCourseChecked: response.data.Type === "задолжителен",
                defaultStaff: true
            });
        });
    };

    resetFormHandler = e => {
        e.preventDefault();
        document.getElementById("edit-form").reset();
        const course = {...this.state.initialCourse};
        this.setState({
            course : course,
            winterSemesterChecked: course.Semester === "Зимски",
            mandatoryCourseChecked: course.Type === "задолжителен",
            formDataValid: {
                Title: true,
                DetailsUrl: true,
                Description: true,
            }
        });
        this.validateForm();
    };

    onFormSubmitHandler = e => {
        e.preventDefault();

        const isFormValid = this.state.formDataValid.Title &&
            this.state.formDataValid.DetailsUrl &&
            this.state.formDataValid.Description;

        if (isFormValid) {
            const initialCourse = {...this.state.initialCourse};
            const modifiedCourse = {
                Id: initialCourse.Id,
                Title: e.target.Title.value,
                Type: e.target.Type.value,
                Year: e.target.Year.value,
                Program: e.target.Program.value,
                Semester: e.target.Semester.value,
                DetailsUrl: e.target.DetailsUrl.value,
                Description: e.target.Description.value,
                ProfessorIds: [...e.target.Professors.options].filter(p => p.selected).map(p => p.value),
                AssistantIds: [...e.target.Assistants.options].filter(a => a.selected).map(a => a.value)
            };

            console.log(modifiedCourse);

            CoursesService.editCourse(initialCourse.Id, modifiedCourse).then(() => {
                this.props.history.push("/admin/courses");
            });

        } else {
            this.validateForm();
        }
    };

    onChangeHandler = e => {
        this.validateInput(e);
    };

    validateInput = e => {
        const modifiedCourse = {...this.state.course};
        const inputName = e.target.name;
        if (e.target.type !== "select-multiple")
            modifiedCourse[inputName] = e.target.value;
        else
            modifiedCourse[inputName] = [...e.target.selectedOptions].map(o => o.value);
        this.setState({course: modifiedCourse});

        if (Object.keys(this.state.formDataValid).includes(inputName)) {
            const formDataValid = {...this.state.formDataValid};
            const inputElement = document.getElementById(inputName);
            if (e.target.value.toString().trim().length > 0) {
                formDataValid[inputName] = true;
                inputElement.classList.remove("is-invalid");
            } else {
                formDataValid[inputName] = false;
                inputElement.classList.add("is-invalid");
            }
            this.setState({formDataValid : formDataValid});
        }
    };

    validateForm = () => {
        const formDataValid = {...this.state.formDataValid};
        Object.entries(formDataValid).forEach(([key, value]) => {
            if (!value) {
                document.getElementById(key).classList.add("is-invalid");
            }
            else
                document.getElementById(key).classList.remove("is-invalid");
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
                <div className="col-9 mx-auto my-4">
                    <div className="my-auto card cardAdd px-3">
                        <form className="p-4" onSubmit={this.onFormSubmitHandler} id="edit-form">
                            <div className="row">
                                <h1 className="text-primary ml-3 font-italic my-0">Измени курс</h1>
                            </div>
                            <hr className="mb-4"/>
                            <div className="row">
                                <div className="col-6">
                                    {this.courseName()}
                                    {this.courseYear()}
                                    {this.courseSemester()}
                                    {this.courseStatus()}
                                    {this.courseProgram()}
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
                                    <Link to="/admin/courses" className="btn btn-block btn-danger"><i
                                        className="fa fa-times"/> Откажи</Link>
                                </div>
                                <div className="col-4 text-center">
                                    <button className="btn btn-block btn-warning text-white"
                                            onClick={this.resetFormHandler}><i className="fa fa-undo"/> Ресетирај
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
                        <input type="text" className="form-control inputText" id="Title"
                               placeholder="Внесете назив на курс" name="Title"
                               defaultValue={this.state.course.Title}
                               onChange={this.onChangeHandler}
                               onBlur={this.onChangeHandler}
                               onFocus={this.onChangeHandler}
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
                    <select name="Year" id="Year" className="form-control custom-select"
                            value={this.state.course.Year}
                            onChange={this.onChangeHandler}>
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
                               name="Semester" value="Зимски"
                               defaultChecked={this.state.winterSemesterChecked}
                               onChange={this.onChangeHandler}/>
                        <label className="custom-control-label" htmlFor="winter">Зимски</label>
                    </div>
                    <div className="custom-control ml-3 custom-radio d-inline">
                        <input type="radio" className="custom-control-input" id="summer"
                               name="Semester" value="Летен"
                               defaultChecked={!this.state.winterSemesterChecked}
                               onChange={this.onChangeHandler}/>
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
                               name="Type" value="задолжителен"
                               defaultChecked={this.state.mandatoryCourseChecked}
                               onChange={this.onChangeHandler}/>
                        <label className="custom-control-label"
                               htmlFor="mandatory">Задолжителен</label>
                    </div>
                    <div className="custom-control ml-3 d-inline custom-radio">
                        <input type="radio" className="custom-control-input" id="elective"
                               name="Type" value="изборен"
                               defaultChecked={!this.state.mandatoryCourseChecked}
                               onChange={this.onChangeHandler}/>
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
                        <select className="form-control custom-select" name="Program" id="Program"
                                value={this.state.course.Program}
                                onChange={this.onChangeHandler}>
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

    courseDetails = () => {
        return (
            <div className="row mb-3">
                <div className="col-3 text-right">
                    <label><b>Детали</b></label>
                </div>
                <div className="col-9">
                    <input type="text" name="DetailsUrl" className="form-control" id="DetailsUrl"
                           placeholder="Поставете линк за детали" defaultValue={this.state.course.DetailsUrl}
                           onChange={this.onChangeHandler}
                           onBlur={this.onChangeHandler}
                           onFocus={this.onChangeHandler}/>
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
                    <textarea name="Description" rows="3" className="form-control" id="Description"
                              style={{resize: "none"}}
                              placeholder="Внесете опис" value={this.state.course.Description}
                              onChange={this.onChangeHandler}
                              onBlur={this.onChangeHandler}
                              onFocus={this.onChangeHandler}/>
                </div>
            </div>
        );
    };

    courseProfessors = () => {
        let result = null;
        if (this.state.defaultStaff) {
            result = (
                <div className="row mb-2">
                    <div className="col-3 text-right">
                        <label><b>Професори</b></label>
                    </div>
                    <div className="col-9 teachers" id="teacher">
                        <select className="form-control" multiple size="8" name="Professors"
                                defaultValue={this.state.course.Professors.map(p => p.Id)}
                                onChange={this.onChangeHandler}>
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
        if (this.state.defaultStaff) {
            result = (
                <div className="row mb-2 mt-3">
                    <div className="col-3 text-right">
                        <label><b>Асистенти</b></label>
                    </div>
                    <div className="col-9">
                        <select className="form-control" multiple size="8" name="Assistants"
                                defaultValue={this.state.course.Assistants.map(a => a.Id)}
                                onChange={this.onChangeHandler}>
                            {this.staffOptions()}
                        </select>
                    </div>
                </div>
            );
        }
        return result;
    };

}

export default withRouter(CourseEdit);