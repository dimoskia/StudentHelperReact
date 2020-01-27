import React from "react";
import './Filters.css';

const Filters = (props) => {

    const changeCheckboxHandler = event => {
        const propName = event.target.name;
        props.changeFilters(propName, [...document.getElementsByName(propName)]);
    };

    const filtersTitle = () => {
        return (
            <article className="card-group-item mb-3">
                <header className="card-header">
                    <h4 className="title"><i className="fa fa-filter"/> Филтри</h4>
                </header>
            </article>
        );
    };

    const filtersYear = () => {
        return (
            <article className="card-group-item mb-3">
                <div className="filter-content">
                    <div className="card-body py-1">
                        <h6 className="title">Учебна година</h6>
                        <div className="row">

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="year1" name="year"
                                           value="1"/>
                                    <label className="custom-control-label" htmlFor="year1">I</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="year2" name="year"
                                           value="2"/>
                                    <label className="custom-control-label" htmlFor="year2">II</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="year3" name="year"
                                           value="3"/>
                                    <label className="custom-control-label" htmlFor="year3">III</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="year4" name="year"
                                           value="4"/>
                                    <label className="custom-control-label" htmlFor="year4">IV</label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </article>
        );
    };

    const filtersSemester = () => {
        return (
            <article className="card-group-item mb-3">
                <div className="filter-content">
                    <div className="card-body py-1">
                        <h6 className="title">Семестар</h6>
                        <div className="row">

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="winter" name="semester"
                                           value="зимски"/>
                                    <label className="custom-control-label" htmlFor="winter">Зимски</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="summer" name="semester"
                                           value="летен"/>
                                    <label className="custom-control-label" htmlFor="summer">Летен</label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </article>
        );
    };

    const filtersType = () => {
        return (
            <article className="card-group-item mb-3">
                <div className="filter-content">
                    <div className="card-body py-1">
                        <h6 className="title">Статус</h6>
                        <div className="row">

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="mandatory" name="type"
                                           value="задолжителен"/>
                                    <label className="custom-control-label" htmlFor="mandatory">Задолжителен</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="elective" name="type"
                                           value="изборен"/>
                                    <label className="custom-control-label" htmlFor="elective">Изборен</label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </article>
        );
    };

    const filtersProgram = () => {
        return (
            <article className="card-group-item mb-3">
                <div className="filter-content">
                    <div className="card-body py-1">
                        <h6 className="title">Смер</h6>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="kni" name="program"
                                           value="КНИ"/>
                                    <label className="custom-control-label" htmlFor="kni">КНИ (Компјутерски науки и
                                        инженерство)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="pet" name="program"
                                           value="ПЕТ"/>
                                    <label className="custom-control-label" htmlFor="pet">ПЕТ (Примена на
                                        е-технологии)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="mt" name="program"
                                           value="МТ"/>
                                    <label className="custom-control-label" htmlFor="mt">МТ (Мрежни технологии)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="ke" name="program"
                                           value="КЕ"/>
                                    <label className="custom-control-label" htmlFor="ke">КЕ (Компјутерска
                                        едукација)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="iki" name="program"
                                           value="ИКИ"/>
                                    <label className="custom-control-label" htmlFor="iki">ИКИ (Информатика и
                                        компјутерско инженерство)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="asi" name="program"
                                           value="АСИ"/>
                                    <label className="custom-control-label" htmlFor="asi">АСИ (Академски студии по
                                        информатика)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input onChange={changeCheckboxHandler} type="checkbox" className="custom-control-input" id="pit" name="program"
                                           value="ПИТ"/>
                                    <label className="custom-control-label" htmlFor="pit">ПИТ (Професионални студии по
                                        информатички технологии)</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </article>
        );
    };

    return (
        <div className="Filters">
            <div className="card shadow-sm">
                {filtersTitle()}
                {filtersYear()}
                {filtersSemester()}
                {filtersType()}
                {filtersProgram()}
            </div>
        </div>
    );
};

export default Filters;
