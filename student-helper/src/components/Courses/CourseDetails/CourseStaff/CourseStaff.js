import React from "react";
import user_image from "../../../../images/user_image.png";

const CourseStaff = (props) => {

   const getActiveUsers = () => {
       if(props.activeUsers!==undefined) {
           return props.activeUsers.map(user => {
               return (
                   <div key={user.UserDetails.UserDetailsId} className="mb-2">
                       <img className="rounded-pill img-fluid shadow-sm" width="45px"
                            height="45px"
                            src={user.UserDetails.ImageUrl === null ? user_image : user.UserDetails.ImageUrl} alt=""/>
                       <span className="ml-2">{user.UserDetails.FirstName} {user.UserDetails.LastName}</span>
                   </div>
               )
           })
       }
    };

   const getProfessors = () => {
       if(props.professors!==undefined) {
           return props.professors.map(prof => {
               return (
                   <div key={prof.Id} className="mb-2">
                       <img src={prof.ImageUrl===null ? user_image : prof.ImageUrl} className="rounded-pill img-fluid shadow-sm" width="45px"
                            height="45px" alt=""/>
                       <span className="ml-2">{prof.FirstName} {prof.LastName}</span>
                   </div>
               )
           });
       }
   };

   const getAssistants = () => {
       if(props.assistants!==undefined) {
           return props.assistants.map(assistant => {
               return (
                   <div key={assistant.Id} className="mb-2">
                       <img src={assistant.ImageUrl===null ? user_image : assistant.ImageUrl} className="rounded-pill img-fluid shadow-sm" width="45px"
                            height="45px" alt=""/>
                       <span className="ml-2">{assistant.FirstName} {assistant.LastName}</span>
                   </div>
               )
           });
       }
   };

    return(
    <div className="col-3">
        <div id="accordion" className="mb-3">
            <div className="card shadow-sm">
                <div className="card-header accordionCard" id="headingOne" data-toggle="collapse"
                     data-target="#collapseOne" aria-expanded="true"
                     aria-controls="collapseOne">
                    <h5 className="mb-0"><i className="fa fa-trophy text-warning"/>
                    <b> Најактивни членови</b></h5>
                </div>

                <div id="collapseOne" className="collapse" aria-labelledby="headingOne">
                    <div className="card-body">
                        {getActiveUsers()}
                    </div>
                </div>
            </div>
            <div className="card shadow-sm">
                <div className="card-header accordionCard" id="headingTwo" data-toggle="collapse"
                     data-target="#collapseTwo" aria-expanded="true"
                     aria-controls="collapseTwo">
                    <h5 className="mb-0" style={{marginLeft: "2px"}}><i className="fa fa-user text-warning" style={{marginRight: "2px"}}/> <b>Професори</b></h5>
                </div>

                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo">
                    <div className="card-body professors">
                        {getProfessors()}
                    </div>
                </div>
            </div>
            <div className="card shadow-sm">
                <div className="card-header accordionCard" id="headingThree" data-toggle="collapse"
                     data-target="#collapseThree" aria-expanded="true"
                     aria-controls="collapseThree">
                    <h5 className="mb-0" style={{marginLeft: "2px"}}><i className="fa fa-user text-warning" style={{marginRight: "2px"}}/> <b>Асистенти</b></h5>
                </div>

                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                >
                    <div className="card-body">
                        {getAssistants()}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
export default CourseStaff;