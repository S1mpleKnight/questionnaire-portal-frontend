import axios from "axios";
import authHeader from "./TokenHeaderService";

export default axios.create({
    baseURL: "http://localhost:80/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": authHeader(),
    }
});