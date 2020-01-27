import React from "react";

const FormSearch = (props) => {

    const changeToCardViewHandler = e => {
        document.getElementById("list-view").classList.remove("active");
        document.getElementById("card-view").classList.add("active");
        props.setCardView(true);
    };

    const changeToListViewHandler = e => {
        document.getElementById("list-view").classList.add("active");
        document.getElementById("card-view").classList.remove("active");
        props.setCardView(false);
    };

    const toggleFavButton = ev => {
        const btn = document.getElementById("fav-button");
        btn.classList.toggle("active");
        props.toggleFavourites();
    };

    return (
        <div className="row mb-4">

            <div className="col-6 pl-0">
                <form className="FormSearch w-100" onSubmit={props.onSearch}>
                    <div className="p-1 bg-light shadow-sm my-0">
                        <div className="input-group">
                            <input type="search" placeholder="Пребарувај по име на курс ..."
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
                <button id="fav-button" onClick={toggleFavButton} className="btn btn-outline-primary shadow-sm w-100 py-2">
                    <span className="fa fa-star text-warning"/> Омилени
                </button>
            </div>

            <div className="col-3">
                <label htmlFor="exampleFormControlSelect1" className="text-muted py-2">Курсеви на страна: </label>
                <select className="ml-1 form-control d-inline shadow-sm py-2"
                        style={{width: "31%"}}
                        defaultValue={props.preselectedPageSize}
                        onChange={props.changePageSize}>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                </select>
            </div>

            <div className="col-1 text-right">
                <div
                    className="btn-group d-inline-block rounded rounded-pill shadow-sm bg-light d-flex justify-content-center"
                    role="group">
                    <button type="button" className="btn btn-light rounded-pill py-2 text-primary view-type active"
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
