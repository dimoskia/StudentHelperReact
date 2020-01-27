import React, {useState} from "react"
import user_image from "../../../../images/user_image.png";
import {Link} from "react-router-dom";
import CoursesService from "../../../../repository/coursesRepository";

const CoursePost = (props) =>{
    const[comment,setComment]=useState({});


    const getComments = (post) =>{
        if(post.Comments!==undefined) {
            return post.Comments.map(comment=>{
                return(
                    <div className="row my-2 mx-2 shadow-sm bg-light" key={comment.Id}>
                        <div className="col-2 text-center my-auto">
                            <img className="rounded-circle d-inline shadow-sm" width="55px" height="55px" src={props.post.UserDetails.ImageUrl===null ? user_image : props.post.UserDetails.ImageUrl} alt=""/>
                        </div>
                        <div className="col-8 pl-0 my-auto">
                            <div>
                                <Link to="#"><small className="d-inline text-muted">{comment.UserDetails.FirstName} {comment.UserDetails.LastName}</small></Link>
                            </div>
                            <div>
                                {comment.Content}
                            </div>
                            <span className="arrowsUp">
                                            <i className="fa fa-thumbs-o-up arrowsUp2 text-success" onClick={(e)=>likeDislikeComment(e,comment.Id,post.Id)}/>
                                        </span>
                            <span className="text-center mb-0 mx-2 text-muted countNumber" onClick={(e)=>likeDislikeComment(e,comment.Id)}>{comment.Likes-comment.Dislikes}</span>
                            <span className="arrowsDown">
                                            <i className="fa fa-thumbs-o-down arrowsDown2 text-danger" onClick={(e)=>likeDislikeComment(e,comment.Id,post.Id)}/>
                                        </span>
                        </div>
                    </div>

                )
            })

        }
    };

    const likeDislikePost = (e,id) =>{
        const flag=e.target.classList.contains("fa-thumbs-o-up");
        CoursesService.likeDislikePost(id,flag);
        const index = props.posts.findIndex(p => p.Id === id);
        const newState = props.posts;
        if(flag){
            newState[index].Likes++;
        }
        else{
            newState[index].Dislikes++;
        }
        props.onNewLikeDislikePost(newState);
    };

    const likeDislikeComment = (e,id,postId)=>{
        const flag=e.target.classList.contains("fa-thumbs-o-up");
        const indexPost=props.posts.findIndex(p=>p.Id===postId);
        const indexComment=props.posts[indexPost].Comments.findIndex(c=>c.Id===id);
        const newState=props.posts;
        CoursesService.likeDislikeComment(id,flag);
        if(flag){
            newState[indexPost].Comments[indexComment].Likes++;
        }
        else{
            newState[indexPost].Comments[indexComment].Dislikes++;
        }
        props.onNewLikeDislikeComment(newState);
    };

    const changeComment = (e) =>{
        setComment({
            content: e.target.value
        });
    };

    const postComment = (e,postId) =>{
        e.preventDefault();
        CoursesService.postComment(postId,comment).then(props.newCommentAdded);

    };

    const formatDate = (date) =>{
        let dateMKD=new Date(date);
        const mapMonth={
            0 : "јануари",
            1 : "февруари",
            2 : "март",
            3 : "април",
            4 : "мај",
            5 : "јуни",
            6 : "јули",
            7 : "август",
            8 : "септември",
            9 : "октомври",
            10 : "ноември",
            11 : "декември"
        };
        return dateMKD.getDate() + ". " + mapMonth[dateMKD.getMonth()] + " " + dateMKD.getFullYear();

    };

    return(
        <div className="mb-4" key={props.post.Id}>
            <div className="row">
                <div className="col-2 text-center my-auto">
                    <img className="rounded-circle d-inline shadow-sm" width="60px"
                         height="60px" src={props.post.UserDetails.ImageUrl===null ? user_image : props.post.UserDetails.ImageUrl} alt={props.post.UserDetails.FirstName + " " + props.post.UserDetails.LastName}/>
                </div>
                <div className="col-10 pl-0">
                    <h5 className="mb-0"><b>{props.post.Title}</b></h5>
                    <div className="text-muted mb-2">
                        <small>објавено од </small><Link to="#"><small
                        className="d-inline text-muted">{props.post.UserDetails.FirstName} {props.post.UserDetails.LastName}</small></Link><small> на {formatDate(props.post.CreatedAt)}</small>
                    </div>
                    <p className="mb-1">{props.post.Content}</p>
                    <span className="arrowsUp1">
                                            <i className="fa fa-thumbs-o-up arrowsUp2 text-success fa-lg" onClick={(e)=>likeDislikePost(e,props.post.Id)}/>
                                        </span>
                    <span
                        className="text-center mb-0 mx-2 text-muted countNumber">{props.post.Likes - props.post.Dislikes}</span>
                    <span className="arrowsDown">
                                            <i className="fa fa-thumbs-o-down arrowsDown2 text-danger fa-lg" onClick={(e)=>likeDislikePost(e,props.post.Id)}/>
                                        </span>
                </div>
            </div>
            <form onSubmit={(e)=>postComment(e,props.post.Id)}>
                <div className="card mt-3 shadow-sm bg-light">
                    <div className="card-body p-2">
                        <textarea className="form-control textValue" placeholder="Напишете коментар" onChange={(e)=>changeComment(e)}/>
                        <button type="submit" className="btn btn-primary float-right mt-2 mb-1">Коментирај</button>
                    </div>
                </div>
            </form>
            {getComments(props.post)}
            <hr  className="mt-4 shadow-sm"/>
        </div>

)
};

export default CoursePost;