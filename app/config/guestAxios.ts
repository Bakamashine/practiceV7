import axios from "axios";
import backend_url from "../constants/url";

const guestAxios = axios.create({
    baseURL: backend_url,
    withCredentials: true,
    validateStatus: status => status < 401
})

export default guestAxios