import AuthService from './AuthService'

export default function authHeader() {
    const user = AuthService.getCurrentUser()
    if (user && user.token) {
        return 'Bearer ' + user.token
    } else {
        return "";
    }
}