import axios from "axios";

// const API_URL = "http://localhost:8080/api/"
const API_URL = "https://questionnaire-portal-system.herokuapp.com/api/"
const LOGIN_ENDPOINT = "login"
const SIGNUP_ENDPOINT = "register"

class AuthService {
    login(email, password) {
        return axios
            .post(
                API_URL + LOGIN_ENDPOINT,
                {
                    email,
                    password
                }
            )
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstname, lastname, phone, email, password) {
        return axios.post(
            API_URL + SIGNUP_ENDPOINT,
            {
                phone,
                email,
                password,
                lastname,
                firstname
            }
        ).then(response => {
            return response
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService()