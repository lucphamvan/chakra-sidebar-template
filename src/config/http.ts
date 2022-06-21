import axios from "axios";
import utilService from "services/util.service";
axios.defaults.baseURL = `http://localhost:8000/api`;
axios.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${utilService.getAccToken()}`;
    }
    return config;
});
export default axios;
