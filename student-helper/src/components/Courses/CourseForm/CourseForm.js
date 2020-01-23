import React, {Component} from 'react';
import ".//CourseForm.css";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import CoursesService from "../../../repository/coursesRepository";

class CourseForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allStaff: [],
            image: null
        };
    }

    componentDidMount() {
        CoursesService.fetchAllStaff().then(response => {
            this.setState({allStaff: response.data});
        });
    }


    fileChangedHandler = e => {
        if (e.target.files.length) {
            this.setState({image: e.target.files[0]});
        }
    };


    onFormSubmitHandler = e => {
        e.preventDefault();

        if(true) {
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
            if (!this.state.image)
                formData.append("image", this.state.image, this.state.image.name);
            this.createCourse(formData);
        }

    };




    createCourse = (formData) => {
        CoursesService.createCourse(formData).then(response => {
            console.log(response);
        });
    };

    staffOptions = () => {
        return (
            this.state.allStaff.map(staffMember => <option key={staffMember.Id}
                                                           value={staffMember.Id}>{staffMember.Name}</option>)
        );
    };


    render() {
        return (
            <div className="courseAdd row w-100">
                <div className="col-8 mx-auto my-4">
                    <div className="my-auto card cardAdd mx-3 px-3">
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
                                    <button type="reset" className="btn btn-block btn-warning text-white"><i
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
                        <input type="text" className="form-control  inputText" id="name"
                               placeholder="Внесете назив на курс" name="title"
                        />
                        <div className="invalid-tooltip">Називот на курсот е задолжителен</div>
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
                               name="semester" defaultChecked/>
                        <label className="custom-control-label" htmlFor="winter">Зимски</label>
                    </div>
                    <div className="custom-control ml-3 custom-radio d-inline">
                        <input type="radio" className="custom-control-input" id="summer"
                               name="semester"/>
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
                               name="type" defaultChecked/>
                        <label className="custom-control-label"
                               htmlFor="mandatory">Задолжителен</label>
                    </div>
                    <div className="custom-control ml-3 d-inline custom-radio">
                        <input type="radio" className="custom-control-input" id="elective"
                               name="type"/>
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
                            <option value="KNI">Компјутерски науки и инженерство</option>
                            <option value="PET">Примена на е-технологии</option>
                            <option value="MT">Мрежни технологии</option>
                            <option value="KE">Компјутерска едукација</option>
                            <option value="IKI">Информатика и компјутерско инженерство</option>
                            <option value="ASI">Академски студии по информатика</option>
                            <option value="PIT">Професионални студии по информатички технологии
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
                    <input type="text" name="detailsUrl" className="form-control"
                           placeholder="Поставете линк за детали"/>
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
                    <textarea name="description" rows="2" className="form-control"
                              placeholder="Внесете опис"/>
                </div>
            </div>
        );
    };

    courseProfessors = () => {
      return (
          <div className="row mb-2">
              <div className="col-3 text-right">
                  <label><b>Професори</b></label>
              </div>
              <div className="col-9 teachers" id="teacher">
                  <select className="form-control" multiple size="8" name="professors">
                      {this.staffOptions()}
                  </select>
              </div>
          </div>
      );
    };

    courseAssistants = () => {
      return (
          <div className="row mb-2 mt-3">
              <div className="col-3 text-right">
                  <label><b>Асистенти</b></label>
              </div>
              <div className="col-9">
                  <select className="form-control" multiple size="8" name="assistants">
                      {this.staffOptions()}
                  </select>
              </div>
          </div>
      );
    };

}

export default withRouter(CourseForm);


