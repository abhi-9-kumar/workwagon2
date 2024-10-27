import axios from "axios";

const BASE_URL = "https://workwagon-server.onrender.com/api/v1/";

export const magicRequest =  axios.create({
    baseURL: BASE_URL,
    withCredentials : true
})