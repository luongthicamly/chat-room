import axios from 'axios';

const axiosClient = axios.create(
    {
        baseURL: "http://localhost:3333/",
        headers: { 
            "Content-Type": "application/json",
            'Auth': window.localStorage.getItem("token")
        },
    }
)
// axiosClient.interceptors.response.use((response) =>{
//     if(response && response.data){
//         // console.log(response)
//         return response.data;
//     } 
//     return response;
// }, (error) => {
//     throw error;
// })

export default axiosClient;