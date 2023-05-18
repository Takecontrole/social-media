import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-media-api.adaptable.app/",
});

export default instance;
