import axios from 'axios';
import {message} from "antd";
export const JWT_TOKEN = 'JWT_TOKEN';
export const SERVER_URL = `http://localhost:4000`;

const authedRequest = axios.create();
authedRequest.interceptors.request.use(function (config) {
    config.url = SERVER_URL + config.url;
    config.headers = {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}`,
    }
    return config;
}, function (err) {
  return Promise.reject(err);
});

authedRequest.interceptors.response.use(function (response) {
  return response;
},function (err) {
  message.warn(err.response.data);
  return Promise.reject(err);
})

export {
  authedRequest
}
