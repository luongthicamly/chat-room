// @flow 

import axiosClient from "./axiosClient";

 const userAPI ={
   getAll: () =>{
       const url = '/users';
       return axiosClient.get(url);
   },
   get: (id) => {
       const url = `/users/${id}`;
       return axiosClient.get(url);
   },
   postUser: (user) => {
    const url = '/users';
    return axiosClient.post(url, {user});
}
};
export default userAPI;