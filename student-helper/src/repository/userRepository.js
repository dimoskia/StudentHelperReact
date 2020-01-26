import axios from '../custom-axios/axios';
import qs from "querystring";

const UsersService = {

    registerUser: (user) => {
        return axios.post("api/users/signup", user);
    },

    loginUser: (user) => {
        return axios.post("/api/users/signin", user);
    },

    handleAuthentication: (userData) => {
        // console.log(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
    },

    logoutUser: () => {
        localStorage.removeItem("userData");
    },

    changePassword : (password, newPassword) =>{
        const data = {
            'Password': password,
            'NewPassword':newPassword
        };
        const formParams = qs.stringify(data);
        return axios.post(`api/users/changePassword`, formParams);
    },

    deactivateUser : (password) =>{
        const data = {
            'Password': password
        };
        const formParams = qs.stringify(data);
        return axios.post(`api/users/deactivateAccount`, formParams);
    },

    changeUserImage : (formData) =>{
        return axios.patch("api/users/changeImage", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

};

export default UsersService;