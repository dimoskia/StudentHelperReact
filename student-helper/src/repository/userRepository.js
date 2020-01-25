import axios from '../custom-axios/axios';

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
    }

};

export default UsersService;