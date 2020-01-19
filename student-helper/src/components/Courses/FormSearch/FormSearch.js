import React from "react";

const formSearch = props => {
    return (
      <div className="row">
          <div className="col-8">
              <form className="w-100">
                  <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                      <div className="input-group">
                          <input type="search" placeholder="Пребарувај по име на курс или професор/асистент..." aria-describedby="button-addon1"
                                 className="form-control border-0 bg-light"/>
                          <div className="input-group-append">
                              <button id="button-addon1" type="submit" className="btn btn-link text-primary" title="Пребарај"><i className="fa fa-search"/></button>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
          <div className="col-4">
              <button className="btn btn-outline-primary rounded-pill shadow-sm py-2 ml-1 mr-4"><i className="fa fa-star text-warning"/> Прегледај омилени</button>
              <div className="btn-group d-inline-block rounded rounded-pill shadow-sm bg-light" role="group">
                  <button type="button" className="btn btn-light rounded-pill py-2 text-primary">
                      <i className="fa fa-th"/>
                  </button>
                  <button type="button" className="btn btn-light rounded-pill py-2 text-primary">
                      <i className="fa fa-list"/>
                  </button>
              </div>
          </div>

      </div>
    );
};

export default formSearch;