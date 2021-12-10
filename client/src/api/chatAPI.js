// @flow 

import axiosClient from "./axiosClient";

 const chatAPI ={
   getAll: (idUser) =>{
       const url = '/chat';
       return axiosClient.get(url);
   },
   get: (id) => {
       const url = `/chat/${id}`;
       return axiosClient.get(url);
   },
   postUser: (user) => {
    const url = '/chat';
    return axiosClient.post(url, {user});
}
};
export default chatAPI;