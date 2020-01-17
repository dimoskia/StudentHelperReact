import React, {Component} from "react";
import FormSearch from "../FormSearch/FormSearch";
import CardItem from "../CardItem/CardItem";

class Container extends Component{

    loadCards = () => {
      return (
          <CardItem/>
      );
    };

    render() {
        return (
            <div className="col-9">
                <div className="container-fluid px-5">
                    <FormSearch/>
                    <div className="row">
                        <div className="card-deck align-items-center">
                            {this.loadCards()}
                            {this.loadCards()}
                            {this.loadCards()}
                            {this.loadCards()}
                            {this.loadCards()}
                            {this.loadCards()}
                        </div>
                </div>

                </div>
                {/*to do: Pagination*/}
            </div>
        );
    }
}

export default Container;