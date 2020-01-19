import React from "react";
import './Filters.css';

const filters = props => {

    const onFormSubmitHandler = e => {
        e.preventDefault();
        const params = new URLSearchParams();
        [...e.target.year].filter(cb => cb.checked).forEach(cb => params.append(cb.name, cb.value));
        [...e.target.semester].filter(cb => cb.checked).forEach(cb => params.append(cb.name, cb.value));
        [...e.target.type].filter(cb => cb.checked).forEach(cb => params.append(cb.name, cb.value));
        [...e.target.program].filter(cb => cb.checked).forEach(cb => params.append(cb.name, cb.value));
        props.applyFilters(params);
    };

    const resetFormHandler = e => {
        e.preventDefault();
        document.getElementById("filters-form").reset();
        props.resetFilters();
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
                                    <input type="checkbox" className="custom-control-input" id="year1" name="year"
                                           value="1"/>
                                    <label className="custom-control-label" htmlFor="year1">I</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="year2" name="year"
                                           value="2"/>
                                    <label className="custom-control-label" htmlFor="year2">II</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="year3" name="year"
                                           value="3"/>
                                    <label className="custom-control-label" htmlFor="year3">III</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="year4" name="year"
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
                                    <input type="checkbox" className="custom-control-input" id="winter" name="semester"
                                           value="зимски"/>
                                    <label className="custom-control-label" htmlFor="winter">Зимски</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="summer" name="semester"
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
                        <h6 className="title">Тип</h6>
                        <div className="row">

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="mandatory" name="type"
                                           value="задолжителен"/>
                                    <label className="custom-control-label" htmlFor="mandatory">Задолжителен</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="elective" name="type"
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
                                    <input type="checkbox" className="custom-control-input" id="kni" name="program"
                                           value="КНИ"/>
                                    <label className="custom-control-label" htmlFor="kni">КНИ (Компјутерски науки и
                                        инженерство)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="pet" name="program"
                                           value="ПЕТ"/>
                                    <label className="custom-control-label" htmlFor="pet">ПЕТ (Примена на
                                        е-технологии)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="mt" name="program"
                                           value="МТ"/>
                                    <label className="custom-control-label" htmlFor="mt">МТ (Мрежни технологии)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="ke" name="program"
                                           value="КЕ"/>
                                    <label className="custom-control-label" htmlFor="ke">КЕ (Компјутерска
                                        едукација)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="iki" name="program"
                                           value="ИКИ"/>
                                    <label className="custom-control-label" htmlFor="iki">ИКИ (Информатика и
                                        компјутерско инженерство)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="asi" name="program"
                                           value="АСИ"/>
                                    <label className="custom-control-label" htmlFor="asi">АСИ (Академски студии по
                                        информатика)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="pit" name="program"
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

    const filtersButtons = () => {
        return (
            <article className="card-group-item mb-3 text-center">
                <div className="filter-content">
                    <div className="card-body py-1">
                        <div className="row">

                            <div className="col">
                                <button type="submit" className="btn btn-primary w-100"><i
                                    className="fa fa-filter"/> Филтрирај
                                </button>
                            </div>

                            <div className="col">
                                <button onClick={resetFormHandler} className="btn btn-secondary w-100"><i
                                    className="fa fa-times"/> Ресетирај
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </article>
        );
    };


    return (
        <div className="col-3 Filters">
            <form onSubmit={onFormSubmitHandler} id="filters-form">
                <div className="card shadow-sm">
                    {filtersTitle()}
                    {filtersYear()}
                    {filtersSemester()}
                    {filtersType()}
                    {filtersProgram()}
                    {filtersButtons()}
                </div>
            </form>
        </div>
    );
};

export default filters;