import axiosClient from "./axiosClient";

const loginAPI ={
    postLogin: (user) => {
        const url= '/login';
        return axiosClient.post(url, {user});
    }
}
export default loginAPI;