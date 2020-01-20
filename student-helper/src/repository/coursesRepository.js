import axios from '../custom-axios/axios';

const CoursesService = {

    fetchCoursesPaged : (pageNumber, pageSize, params) => {
        return axios.get("/api/courses", {
            headers : {
                'page' : pageNumber + 1,
                'pageSize' : pageSize
            },
            params : params
        });
    },

    searchCourses : (term) => {
        return axios.get(`/api/courses/search?searchTerm=${term}`);
    }

};

export default CoursesService;