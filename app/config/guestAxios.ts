import axios from "axios";
import backend_url from "./url";

const guestAxios = axios.create({
    baseURL: backend_url,
    validateStatus: status => status < 401
    
})

export default guestAxios