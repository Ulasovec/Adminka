import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF8';
api.defaults.headers.post['Accept'] = 'application/json';
api.defaults.headers.post['Accept-Encoding'] = 'identity';

export { api }
