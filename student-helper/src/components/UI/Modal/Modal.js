import React, {Component} from 'react';
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop'
import StaffAdd from "../../Staffs/StaffAdd/StaffAdd";

class Modal extends Component {

    render() {

        return (

            <div>

                <Backdrop show={this.props.show}/>

                <div
                    className={"Modal"}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>

                    {this.props.children}

                </div>

            </div>

        );

    }

}

export default Modal;