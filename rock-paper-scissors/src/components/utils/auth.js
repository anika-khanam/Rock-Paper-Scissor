import axiosInstance from "./axiosInstance";

export const setAuthToken = (token) => {
    if (token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } 
    else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
}

// Function to retrieve token from local storage
export const getAuthToken = () => {
    return localStorage.getItem('access_token');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const storeRefreshToken = (token) => {
    localStorage.setItem('refresh_token', token);
};

// Function to store the token in local storage
export const storeAuthToken = (token) => {
    localStorage.setItem('access_token', token);
};

// Function to clear the token from local storage
export const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};