import axios from "axios";
import { storeAuthToken, storeRefreshToken, setAuthToken, getRefreshToken } from "./auth";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/"
})

// Uncomment to log all axios request headers
// axiosInstance.interceptors.request.use(request => {
//     console.log('Request Headers:', request.headers);
//     return request;
// });
let isRefreshing = false;
axiosInstance.interceptors.response.use(resp => resp, async error => {
    const origRequest = error.config;
    if (error.response.status === 401 && !isRefreshing) {
        isRefreshing = true;
        console.log("Refreshing token")
        console.log("prev refresh token: ", getRefreshToken());
        try{
            const response = await axiosInstance.post('token/refresh/', { refresh:getRefreshToken() });
            if (response.status === 200) {
                console.log("new access token: ", response.data.access);
                console.log("new refresh token: ", response.data.refresh);
                storeAuthToken(response.data.access);
                storeRefreshToken(response.data.refresh);
                setAuthToken(response.data.access);
                origRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                return axios(origRequest);
            }
        }
        catch (err){
            console.error('Failed token refresh: ', err)
        }
        finally {
            isRefreshing = false;
        }
        
    }

    return Promise.reject(error);
});

export default axiosInstance