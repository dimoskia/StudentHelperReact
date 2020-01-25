import axios from '../custom-axios/axios';
import qs from "qs";

const CoursesService = {

    fetchCoursesPaged: (pageNumber, pageSize, params) => {
        params.set("page", pageNumber);
        params.set("pageSize", pageSize);
        return axios.get("/api/courses", {params: params});
    },

    getCourse : (courseId) => {
        return axios.get(`/api/courses/${courseId}`);
    },

    createCourse: (formData) => {
        return axios.post("/api/courses", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },

    editCourse: (courseId, modifiedCourse) => {
        return axios.put(`/api/courses/${courseId}`, modifiedCourse);
    },

    fetchAllStaff: () => {
        return axios.get("/api/staff/all");
    },

    changeCourseImage: (courseId, formData) => {
        return axios.patch(`api/courses/changeImage/${courseId}`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },

    deleteCourse: (courseId) => {
        return axios.delete(`api/courses/${courseId}`);
    },

    searchCourse : (name) => {
        return axios.get(`/api/courses/${name}`);
    },

    fetchPosts : (params) =>{
        return axios.get(`api/courses/${params}/posts`);
    },
    fetchPostsNextPage : (newUrl) =>{
        return axios.get(newUrl);
    },

    likeDislikePost : (nameId,flag) =>{
        if(flag) {
            return axios.post(`api/posts/${nameId}/Like`);
        }
        else{
            return axios.post(`api/posts/${nameId}/Dislike`)
        }
    },

    likeDislikeComment : (nameId,flag) =>{
        if(flag){
            return axios.post(`api/Comments/${nameId}/Like`);
        }
        else{
            return axios.post(`api/Comments/${nameId}/Dislike`);
        }
    },

    postComment : (postId, comment) => {
        const data = {
            ...comment
        };
        const formParams = qs.stringify(data);
        return axios.post(`api/posts/${postId}/Comments`, formParams);
    },

    postPost : (courseId, post) => {
        const data = {
            ...post
        };
        const formParams = qs.stringify(data);
        console.log(formParams);
        return axios.post(`api/courses/${courseId}/Posts/Add`, formParams);
    }

};

export default CoursesService;
