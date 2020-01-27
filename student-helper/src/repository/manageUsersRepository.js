import axios from '../custom-axios/axios';

const ManageUsersService = {

    fetchUsersPaged: (pageNumber, pageSize, params) => {
        params.set("page", pageNumber);
        params.set("pageSize", pageSize);
        return axios.get("/api/users", {params: params});
    },

    promoteUserToAdmin : (userId, userRole) => {
        console.log(userRole);
        return axios.post(`/api/users/changeRole/${userId}`, "\"" + userRole + "\"", {
            headers : {
                "Content-type" : "application/json"
            }

        });
    }

};

export default ManageUsersService;
