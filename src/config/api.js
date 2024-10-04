import axios from "axios";

const baseUrl = process.env.REACT_APP_BE_URL

export const callLogin = (username, password) => {
    return axios.post(`${baseUrl}/api/users/login`, {
        username,
        password,
    });
};

export const callLogout = () => {
    return axios.post(`${baseUrl}/api/users/logout`);
};