import React, {Component} from "react";
import UserPrivacy from "./UserPrivacy/UserPrivacy";
import "./UserDetails.css"
import course from "../../images/course.jpg";


class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            param:this.props.match.params,
            user:{
                Id:1,
                Email: "hristijan_davinovski@hotmail.com",
                Role: "",
                Salt: "",
                Password: "12345",
                Confirmed: true,
                UserDetails: {
                    UserDetailsId: 1,
                    FirstName: "Христијан",
                    LastName: "Давиновски",
                    ImageUrl: null
                }
            }
        }
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () =>{
    };

    changeFirstName = (e) =>{
        const newValue=e.target.value;
        this.setState(prevState=>({
            user:{
                UserDetails:{
                    ...prevState.user.UserDetails,
                    FirstName: newValue
                }
            }
        }));
    };

    changeLastName = (e) =>{
        const newValue=e.target.value;
        this.setState(prevState=>({
            user:{
                UserDetails:{
                    ...prevState.user.UserDetails,
                    LastName: newValue
                }
            }
        }));
    };

    render(){
        return (
            <div className="container containerForm mb-2 UserInfo">
                <div className="row mt-3">
                            <div className="col">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2>Мој профил</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row h-100">
                    <UserPrivacy/>
                    <div className="col-9 mt-3">
                                <div className="card shadow-sm h-100">
                                    <div className="card-header">
                                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="one-tab" data-toggle="tab" href="#one" role="tab"
                                                   aria-controls="One" aria-selected="true"><i className="fa fa-user text-primary"/><b> Лични податоци</b></a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab"
                                                   aria-controls="Two" aria-selected="false"><i className="fa fa-star text-warning"/><b> Омилени курсеви</b></a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active p-3" id="one" role="tabpanel"
                                             aria-labelledby="one-tab">
                                            <form className="my-auto">
                                                <div className="row mx-5 my-3">
                                                    <div className="col-3 text-right my-auto"><b>Име</b></div>
                                                    <div className="col-6">
                                                        <input type="text" className="form-control" onChange={(e)=>this.changeFirstName(e)} value={this.state.user.UserDetails.FirstName}/>
                                                    </div>
                                                </div>
                                                <div className="row mx-5 mt-4">
                                                    <div className="col-3 text-right my-auto"><b>Презиме</b></div>
                                                    <div className="col-6">
                                                        <input type="text" className="form-control" onChange={(e)=>this.changeLastName(e)} value={this.state.user.UserDetails.LastName}/>
                                                    </div>
                                                </div>
                                                <div className="row mx-5 mt-4">
                                                    <div className="col-3 text-right my-auto"><b>Email</b></div>
                                                    <div className="col-6">
                                                        <input type="text" className="form-control emailInput" value={this.state.user.Email} disabled/>
                                                    </div>
                                                </div>
                                                <div className="row mx-5 mt-4">
                                                    <div className="col-3 text-right my-auto"><b>Опис</b></div>
                                                    <div className="col-6">
                                                        <textarea className="form-control" rows="4"/>
                                                    </div>
                                                </div>
                                                <div className="row mx-5 mt-4">
                                                    <div className="col-4 offset-4 text-center">
                                                        <button className="btn btn-primary btn-block">Промени</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade p-30" id="two" role="tabpanel" aria-labelledby="two-tab">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th className="text-center">Слика</th>
                                                    <th>Назив</th>
                                                    <th className="text-center">Отстрани</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td className="text-center"><img src={this.state.user.UserDetails.ImageUrl===null ? course : this.state.user.UserDetails.ImageUrl} alt="" width="70px" height="45px" className="shadow-sm"/></td>
                                                    <td className="my-auto align-middle">Веб базирани системи</td>
                                                    <td className="text-center"><button className="btn"><i className="fa fa-times text-danger"/></button></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center"><img src={course} width="70px" height="45px" className="shadow-sm" alt=""/></td>
                                                    <td className="my-auto align-middle">Напредно програмирање</td>
                                                    <td className="text-center"><button className="btn"><i className="fa fa-times text-danger"/></button></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center"><img src={course} width="70px" height="45px" className="shadow-sm" alt=""/></td>
                                                    <td className="my-auto align-middle">Веб програмирање</td>
                                                    <td className="text-center"><button className="btn"><i className="fa fa-times text-danger"/></button></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default UserDetails;