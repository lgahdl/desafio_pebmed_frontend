import axios from "axios";
import {vue} from "../main";

const http = axios.create({
    baseURL: process.env.VUE_APP_ROOT_API,
    headers: {
        "Content-Type": "application/json",
    }
})

http.interceptors.request.use((request) => {
    vue.$store.dispatch("pushTask");
    return request;
});

http.interceptors.response.use((response) => {
    vue.$store.dispatch("removeTask");
    return response;
})

export default http;