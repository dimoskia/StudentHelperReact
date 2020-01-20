import React, {useEffect} from "react";

const FormSearch = props => {

    useEffect(() => {
        if (props.cardView)
            document.getElementById("card-view").classList.add("active");
        else
            document.getElementById("list-view").classList.add("active");
    }, []);


    const changeToCardViewHandler = e => {
        e.preventDefault();
        document.getElementById("list-view").classList.remove("active");
        document.getElementById("card-view").classList.add("active");
        props.changeView(true);
    };

    const changeToListViewHandler = e => {
        e.preventDefault();
        document.getElementById("list-view").classList.add("active");
        document.getElementById("card-view").classList.remove("active");
        props.changeView(false);
    };

    const changePageSizeHandler = e => {
        e.preventDefault();
        const params = new URLSearchParams();
        [...document.getElementsByName("year")].filter(cb => cb.checked).forEach(cb => params.append(cb.name, cb.value));
        [...document.getElementsByName("semester")].filter(cb => cb.checked).forEach(cb => params.append(cb.name, cb.value));
        [...document.getElementsByName("type")].filter(cb => cb.checked).forEach(cb => params.append(cb.name, cb.value));
        [...document.getElementsByName("program")].filter(cb => cb.checked).forEach(cb => params.append(cb.name, cb.value));
        props.changePageSize(e.target.value, params);
    };

    const onFormSubmitHandler = e => {
        e.preventDefault();
        props.onSearch(e.target["term"].value);
    };

    return (
        <div className="row">
            <div className="col-6 pl-0">
                <form className="w-100 mb-4 p-0 FormSearch" onSubmit={onFormSubmitHandler}>
                    <div className="p-1 bg-light shadow-sm my-0" style={{padding: "0"}}>
                        <div className="input-group">
                            <input type="search" placeholder="Пребарувај по име на курс или професор/асистент..."
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
            </div>
            <div className="col-2">
                <button className="btn btn-outline-primary shadow-sm w-100 py-2"><i
                    className="fa fa-star text-warning"/> Омилени
                </button>
            </div>

            <div className="col-2">
                <label htmlFor="exampleFormControlSelect1" className="text-muted py-2">прикажи</label>
                <select className="form-control w-50 d-inline ml-2 shadow-sm py-2"
                        id="exampleFormControlSelect1"
                        name="page-size"
                        defaultValue={props.pageSize}
                        onChange={changePageSizeHandler}>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                </select>
            </div>

            <div className="col-1 pr-0 mr-0 ml-2">
                <div
                    className="btn-group d-inline-block rounded rounded-pill shadow-sm bg-light d-flex justify-content-center clearfix"
                    role="group">
                    <button type="button" className="btn btn-light rounded-pill py-2 text-primary view-type"
                            onClick={changeToCardViewHandler} id="card-view">
                        <i className="fa fa-th"/>
                    </button>
                    <button type="button" className="btn btn-light rounded-pill py-2 text-primary view-type"
                            onClick={changeToListViewHandler} id="list-view">
                        <i className="fa fa-list"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormSearch;