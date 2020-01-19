import axios from '../custom-axios/axios';

const CoursesService = {

    fetchCoursesPaged : (pageNumber, pageSize, params) => {
        console.log(pageNumber + 1);
        console.log("=========");
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