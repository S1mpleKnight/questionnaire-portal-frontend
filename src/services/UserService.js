import http from './HttpAuthHeaderService'

const USER_PROFILE_URL = '/profile'
const USER_PASSWORD_URL = '/password'

class UserService {
    getProfileData() {
        return http.get(USER_PROFILE_URL);
    }

    updateProfileData(data) {
        return http.put(USER_PROFILE_URL, data);
    }

    updatePassword() {
        return http.put(USER_PASSWORD_URL);
    }
}

export default new UserService()