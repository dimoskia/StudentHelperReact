import React, {Component} from 'react';
import './DeleteElement.css';

class DeleteElement extends Component {

    deleteElement = () => {

        const whatToDelete = this.props.whatToDelete;

        if(whatToDelete === "вработениот" ){
            this.props.deleteStaff(this.props.deletedId);
        } else {
            this.props.deleteCourse(this.props.deletedId);
        }

    };

    render() {

        return (

            <div className="card">
                <div className="card-header text-center deleteHeader text-uppercase" style={{
                    backgroundColor: "#f7cac9",
                    color: "#c94c4c"
                }}>
                    <b>Одобрете бришење</b>
                </div>
                <div className="card-body text-center">
                    <p className="card-text">Дали сте сигурни дека сакате да го избришете {this.props.whatToDelete} <b>{this.props.title}</b>?</p>
                </div>
                <div className="card-footer" style={{backgroundColor: "white"}}>
                    <div className="row">
                        <div className="col">

                            <button onClick={this.props.modalClosed}
                                    className="btn btn-success w-100">
                                    <i className="fa fa-times"/> Откажи</button>
                        </div>

                        <div className="col">
                            <button onClick={this.deleteElement}
                                    className="btn btn-danger w-100">
                                    <i className="fa fa-trash"/> Избриши</button>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}

export default DeleteElement;