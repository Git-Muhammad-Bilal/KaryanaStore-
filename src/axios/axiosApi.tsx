import axios from "axios";



const axiosApi = axios.create({
    baseURL: 'http://localhost:3003'

})

axiosApi.interceptors.request.use(function (config) {
    
    let token = localStorage.getItem('accessToken');
      
      
    config.headers.token = token
    return config;
    
}, function (error) {
    return Promise.reject(error);
});

axiosApi.interceptors.response.use(function (response) {
    console.log(response,'axios')
    
    if (response.data?.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
    }

    if (response.data?.message === 'jwt expired') {
        localStorage.removeItem('accessToken');
    }
    return response;

}, function (error) {
    return Promise.reject(error);

});


export default axiosApi;