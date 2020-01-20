import React, {Component} from 'react'
import "../CourseAdd/CourseAdd.css"
import {Link} from "react-router-dom";

class CourseAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownTeachers: [""
            ],
            dropdownAssistants: [""
            ],
            dataTeachers:[
                {id: 0, name: ""},
                {id: 1, name: 'Димитар Трајанов'},
                {id: 2, name: 'Ристе Стојанов'},
                {id: 3, name: 'Верица Бакева'},
                {id: 4, name: 'Андреја Наумовски'}
            ],
            dataAssistants:[
                {id: 0, name: ''},
                {id: 1, name: 'Бојана Котеска'},
                {id: 2, name: 'Илинка Иваноска'},
                {id: 3, name: 'Костадин Мишев'},
                {id: 4, name: 'Милош Јовановиќ'}
            ],
            chosenTeachers: [],
            chosenAssistants: []

        };
    }

    changeValuesTeachers = (event,index) =>{
        const newTeachers = [...this.state.chosenTeachers];
        newTeachers[index] = event.target.value;
        this.setState({
            chosenTeachers: newTeachers
        });
    };
    changeValuesAssistants = (event,index) =>{
        const newAssistants = [...this.state.chosenAssistants];
        newAssistants[index]=event.target.value;
        this.setState({
            chosenAssistants: newAssistants
        });
    };

    addDropdownTeacher = (e) => {
        e.preventDefault();

        this.setState({
                dropdownTeachers: [...this.state.dropdownTeachers, ""],
                chosenTeachers: [...this.state.chosenTeachers, ""]

            }
        );
    };

    addDropdownAssistant = (e) => {
        e.preventDefault();
        this.setState({
                dropdownAssistants: [...this.state.dropdownAssistants, ""],
                chosenAssistants: [...this.state.chosenAssistants,""]
            }
        );
    };

    deleteDropdownTeacher = (event, index) => {
        event.preventDefault();
        this.state.dropdownTeachers.splice(-1,1);
        this.state.chosenTeachers.splice(index,1);
        this.setState({
            dropdownTeachers: this.state.dropdownTeachers,
            chosenTeachers: this.state.chosenTeachers
        })

    };

    deleteDropdownAssistant = (e,index) => {
        e.preventDefault();
        this.state.dropdownAssistants.splice(-1,1);
        this.state.chosenAssistants.splice(index,1);
        this.setState({
            dropdownAssistants: this.state.dropdownAssistants,
            chosenAssistants: this.state.chosenAssistants
        })
    };

    render() {
        return (
            <div className="courseAdd row w-100 vh-100">
                <div className="col-8 mx-auto my-auto">
                    <div className="my-auto card cardAdd mx-3 px-3">
                        <form className="p-4">
                            <div className="row">
                                <h1 className="text-primary ml-3 font-italic my-0">Додади курс</h1>

                            </div>
                            <hr className="mb-4"/>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <div className="row mb-3">
                                            <div className="col-3 text-align:left">
                                                <label><b>Име</b> </label>
                                            </div>
                                            <div className="col-9">
                                                <input type="text" className="form-control  inputText"
                                                       placeholder="Внесете име" name="Title"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-3">
                                            <b>Година</b>
                                        </div>
                                        <div className="col-9">
                                            <select name="Year" className="form-control custom-select">
                                                <option value="1">1-ва година</option>
                                                <option value="2">2-ра година</option>
                                                <option value="3">3-та година</option>
                                                <option value="4">4-та година</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-3">
                                            <b>Семестар</b>
                                        </div>
                                        <div className="col-9">
                                            <div className="custom-control custom-radio d-inline">
                                                <input type="radio" className="custom-control-input" id="winter"
                                                       name="Semester"/>
                                                <label className="custom-control-label" htmlFor="winter">Зимски</label>
                                            </div>
                                            <div className="custom-control ml-3 custom-radio d-inline">
                                                <input type="radio" className="custom-control-input" id="summer"
                                                       name="Semester"/>
                                                <label className="custom-control-label" htmlFor="summer">Летен</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row mb-3">
                                        <div className="col-3">
                                            <b>Статус</b>
                                        </div>
                                        <div className="col-9">
                                            <div className="custom-control d-inline custom-radio">
                                                <input type="radio" className="custom-control-input" id="mandatory"
                                                       name="Type"/>
                                                <label className="custom-control-label"
                                                       htmlFor="mandatory">Задолжителен</label>
                                            </div>
                                            <div className="custom-control ml-3 d-inline custom-radio">
                                                <input type="radio" className="custom-control-input" id="elective"
                                                       name="Type"/>
                                                <label className="custom-control-label"
                                                       htmlFor="elective">Изборен</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row mb-2">
                                            <div className="col-3">
                                                <label><b>Смер</b></label>
                                            </div>
                                            <div className="col-9">
                                                <select className="form-control custom-select" name="Program">
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

                                    <div className="row">
                                        <div className="col-3">
                                            <label><b>Слика</b></label>
                                        </div>
                                        <div className="col-9">
                                            <div className="form-group">

                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="customFile"
                                                           accept="image/*"/>
                                                    <label className="custom-file-label" htmlFor="customFile"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-3">
                                            <label><b>Детали</b></label>
                                        </div>
                                        <div className="col-9">
                                            <input type="text" name="Details" className="form-control"
                                                   placeholder="Поставете линк за детали"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-3">
                                            <label> <b>Опис</b></label>
                                        </div>
                                        <div className="col-9">
                                        <textarea name="Description" rows="2" className="form-control"
                                                  placeholder="Внесете опис"/>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-6">
                                    <div className="row mb-2">
                                        <div className="col-3">
                                            <label><b>Професори</b></label>
                                        </div>
                                        <div className="col-9 teachers" id="teacher">
                                            {
                                                this.state.dropdownTeachers.map((dropdown, index) => {
                                                    return (
                                                        <div key={{index}}>
                                                            <select
                                                                className="form-control d-inline selectTeacher custom-select"
                                                            onChange={(e)=>this.changeValuesTeachers(e,index)} value={this.state.chosenTeachers[index]}>
                                                                {
                                                                    this.state.dataTeachers.map(p=>{
                                                                        return(
                                                                            <option value={p.id}>{p.name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            <button className="btn d-inline btn-light"
                                                                    onClick={(e) => this.deleteDropdownTeacher(e, index)}>
                                                                <i className="fa fa-times"/></button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-5 offset-7">
                                            <button id="addNewProfButton" className="btn btn-block btn-primary"
                                                    onClick={this.addDropdownTeacher}>
                                                <i className="fa fa-plus"/> Додади
                                            </button>

                                        </div>
                                    </div>


                                    <div className="row mb-2 mt-5">
                                        <div className="col-3">
                                            <label><b>Асистенти</b></label>
                                        </div>
                                        <div className="col-9">
                                            {
                                                this.state.dropdownAssistants.map((dropdown, index) => {
                                                    return (
                                                        <div key={{index}}>
                                                            <select
                                                                className="form-control d-inline selectTeacher custom-select"
                                                                onChange={(e)=>this.changeValuesAssistants(e,index)} value={this.state.chosenAssistants[index]}>
                                                                {
                                                                    this.state.dataAssistants.map(p=>{
                                                                        return(
                                                                            <option value={p.id}>{p.name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            <button className="btn d-inline btn-light"
                                                                    onClick={(e) => this.deleteDropdownAssistant(e, index)}>
                                                                <i className="fa fa-times"/></button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-5 offset-7">
                                            <button id="addNewProfButton" className="btn btn-block btn-primary"
                                                    onClick={this.addDropdownAssistant}>
                                                <i className="fa fa-plus"/> Додади
                                            </button>
                                        </div>
                                    </div>
                                    </div>

                            </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Link to="/" className="btn btn-block btn-danger"><i className="fa fa-times"/> Откажи</Link>
                                    </div>
                                    <div className="col-4 text-center">
                                        <button type="reset" className="btn btn-block btn-warning text-white"><i className="fa fa-undo"/> Ресетирај
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-block btn-success"><i className="fa fa-save"/> Зачувај
                                        </button>
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    };
}
export default CourseAdd;


