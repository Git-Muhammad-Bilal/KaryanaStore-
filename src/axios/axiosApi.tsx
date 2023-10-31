import axios from "axios";


const axiosApi = axios.create({
    baseURL: 'http://localhost:3003'
    
})


export interface localStorageTypes{
   accessToken:string | null,
   buyerOrStore:string | null,
}
axiosApi.interceptors.request.use(function (config) {
    
    let localStrg:any = localStorage.getItem('accessToken');
    let strg:localStorageTypes = JSON.parse(localStrg)
    
    config.headers.token = strg?.accessToken
    return config;
    
}, function (error) {
    return Promise.reject(error);
});

axiosApi.interceptors.response.use(function (response) {
    
    if (response.data?.accessToken) {
           
        localStorage.setItem('accessToken', JSON.stringify(response.data)) ;
    }

    if (response.data?.message === 'jwt expired') {
        localStorage.removeItem('accessToken');
    }
    return response;

}, function (error) {
    return Promise.reject(error);

});


export default axiosApi;