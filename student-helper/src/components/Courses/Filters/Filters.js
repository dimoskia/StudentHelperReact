import React from "react";
import './Filters.css';

const filters = props => {

    const filtersTitle = () => {
        return (
            <article className="card-group-item mb-3">
                <header className="card-header">
                    <h4 className="title">Filters</h4>
                </header>
            </article>
        );
    };

    const filtersYear = () => {
        return (
            <article className="card-group-item mb-3">
                <div className="filter-content">
                    <div className="card-body py-1">
                        <h6 className="title">School year</h6>
                        <div className="row">

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="year1" name="year"/>
                                    <label className="custom-control-label" htmlFor="year1">I</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="year2" name="year"/>
                                    <label className="custom-control-label" htmlFor="year2">II</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="year3" name="year"/>
                                    <label className="custom-control-label" htmlFor="year3">III</label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="year4" name="year"/>
                                    <label className="custom-control-label" htmlFor="year4">IV</label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </article>
        );
    };



    return (
      <div className="col-3 Filters">
          <form>
              <div className="card shadow-sm">
                  {filtersTitle()}
                  {filtersYear()}
              </div>
          </form>
      </div>
    );
};

export default filters;