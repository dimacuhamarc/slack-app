import { API_URL } from '../constants/Constants';
import axios from 'axios';

const UserService = {
    // Object method for getting users
    getUsers: async function(user) {
        try {
            const response = await axios.get(`${API_URL}/users`, {
                headers: {
                    "access-token": user.accessToken,
                    expiry: user.expiry,
                    client: user.client,
                    uid: user.uid
                }
            })
            const users = response.data.data;
            return users.filter((user) => user.id >= 4000);
        } catch(error){
            if(error.response.data.errors){
                return alert("Cannot get users");
            }
        }
    }
}

export default UserService;