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
    }

};

export default CoursesService;