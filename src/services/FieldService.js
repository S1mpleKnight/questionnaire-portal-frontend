import http from './HttpAuthHeaderService'

const FIELD_DATA = '/fields'

class UserService {
    getAllFields() {
        return http.get(FIELD_DATA);
    }

    createField(data) {
        return http.post(FIELD_DATA, data);
    }

    updateField(data) {
        return http.put(FIELD_DATA, data);
    }

    deleteField(data) {
        return http.delete(FIELD_DATA)
    }
}

export default new UserService()