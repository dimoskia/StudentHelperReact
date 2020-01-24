import axios from '../custom-axios/axios';

const CoursesService = {

    fetchCoursesPaged: (pageNumber, pageSize, params) => {
        if (params === null)
            params = new URLSearchParams();
        params.append("page", pageNumber + 1);
        params.append("pageSize", pageSize);
        return axios.get("/api/courses", {params: params});
    },

    searchCourses: (term, pageNumber, pageSize) => {
        const params = new URLSearchParams();
        if (term !== null) {
            params.append("searchTerm", term);
        }
        params.append("page", pageNumber + 1);
        params.append("pageSize", pageSize);
        return axios.get("/api/courses/search", {params: params});
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
    }

};

export default CoursesService;
