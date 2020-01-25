import axios from '../custom-axios/axios';

const UsersService = {

    registerUser: (user) => {
        return axios.post("api/users/signup", user);
    }

};

export default UsersService;