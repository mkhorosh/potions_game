import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/'
    // withCredentials: true,

    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     contentType: 'application/json'
    // }
    // headers: {
    //     Authorization: `Bearer ${token}`
    // }
});

export const LoginApi = (payload) => {
    return instance.post(`auth/login`, {
        ...payload
    });
};