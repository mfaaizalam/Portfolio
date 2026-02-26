import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://portfolio-git-main-muhammad-faaiz-alams-projects.vercel.app/api",
    // baseURL:"http://localhost:5000/api",
})