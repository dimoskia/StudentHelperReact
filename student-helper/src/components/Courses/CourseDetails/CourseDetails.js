import React, {Component} from 'react'
import './CourseDetails.css'
import {Link} from "react-router-dom";
import CoursesService from "../../../repository/coursesRepository";
import CourseStaff from "./CourseStaff/CourseStaff";
import CourseInfo from "./CourseInfo/CourseInfo";
import CoursePost from "./CoursePost/CoursePost";

class CourseDetails extends Component {

    constructor(props){
        super(props);
        this.state= {
            course: {
                PopularityStats: []
            },
            param: this.props.match.params,
            pagination: {
                PageNumber: 0,
                PageSize: 1,
                TotalPages: 0,
                TotalRecords: 0
            },
            posts:[],
            NextPageUrl:"",
            post:{
                title:"",
                content:""
            }
        }
    }

    componentDidMount() {
        this.loadCourses();
    }

    loadCourses = () =>{
        CoursesService.searchCourse(this.state.param.name).then((data) => {
            this.setState({
                course:data.data
            });
    });
        this.loadPosts();

    };

    loadPosts = (pageNumber=0, params=this.state.param.name,pageSize=this.state.pagination.PageSize) => {
        CoursesService.fetchPosts(pageNumber,pageSize,params).then(data => {
            this.setState({
                posts: data.data.Results,
                NextPageUrl: data.data.NextPageUrl
            });
        });
    };

    likeDislikePost = (newState) =>{
        this.setState({
            posts: newState
        })
    };

    likeDislikeComment = (newState) =>{
        this.setState({
            posts:newState
        })
    };


    postComment = (e,postId) =>{
        e.preventDefault();

    };

    postPost = (e) => {
        e.preventDefault();
        const post = {
            "Comments": [],
            "UserDetailsId": 1,
            "Title": this.state.post.title,
            "Content": this.state.post.content,
            "Likes": 0,
            "Dislikes": 0,
            "CreatedAt": "2013-12-31T00:00:00"
        };
        CoursesService.postPost(this.state.param.name,post);
        this.loadCourses();
    };

    getCoursePosts = () =>{
        return this.state.posts.map(post=>{
            return(
                <CoursePost post={post}
                            posts={this.state.posts}
                            onNewLikeDislikePost={this.likeDislikePost}
                            onNewLikeDislikeComment={this.likeDislikeComment}
                            newComm={this.postComment}
                />
            )
        })
    };

    loadNewPage = () =>{
        CoursesService.fetchPostsNextPage(this.state.NextPageUrl).then(data=>{
            this.setState({
                posts: this.state.posts.concat(data.data.Results),
                NextPageUrl: data.data.NextPageUrl
            })
        });
    };

    changePost = (e) => {
        const flag=e.target.classList.contains("textAreaDescription");
        if(flag) {
            this.setState({
                post: {
                    title: this.state.post.title,
                    content: e.target.value
                }
            });
        }
        else{
            this.setState({
                post:{
                    title:e.target.value,
                    content: this.state.content
                }
            });
        }
    };

    render() {
        return (
            <div className="container-fluid px-5 py-0 courseDetails">
                <div className="row mt-3">
                    <div className="col">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2>{this.state.course.Title}</h2>
                                <span><Link to="/">Дома </Link> / {this.state.course.Title}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <CourseInfo semester={this.state.course.Semester}
                                type={this.state.course.Type}
                                description={this.state.course.Description}
                                year={this.state.course.Year}
                                program={this.state.course["Program"]}
                                detailsLink={this.state.DetailsUrl}
                    />

                    <div className="col-6">
                        <div className="card bg-light shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <h4><b>Поставете прашање</b></h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e)=>this.postPost(e)}>
                                    <h5><b>Наслов</b></h5>
                                    <input type="text" name="Title" className="form-control mb-3"
                                           placeholder="пр. Каков е начинот на полагање на предметот?" onChange={(e)=>this.changePost(e)}/>
                                    <h5><b>Опис</b></h5>
                                    <textarea className="form-control textAreaDescription" name="Comment"
                                              placeholder="Внесете опис" onChange={(e)=>this.changePost(e)}/>
                                    <button type="submit" className="btn btn-primary float-right mt-3">Постави прашање
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="card my-3 shadow-sm">
                            <div className="card-body">
                                {this.getCoursePosts()}
                                </div>
                                <a href="#" className="text-primary text-center d-block linkShowMore" onClick={this.loadNewPage}>
                                    <span className={this.state.NextPageUrl===null ? "d-none" : "d-inline"}>Прикажи повеќе</span></a>
                            </div>
                        </div>
                    <CourseStaff activeUsers={this.state.course.PopularityStats}
                                 professors={this.state.course.Professors}
                                 assistants={this.state.course.Assistants}/>
                </div>
            </div>
        );
    }
}
export default CourseDetails;