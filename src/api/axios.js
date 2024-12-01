import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:4000/api',
    baseURL: 'https://msc-backend-1.onrender.com',
    withCredentials: true,
    headers:{
        Accept: 'application/json'
    }
});

export default instance;
