import http from './HttpAuthHeaderService'

const FIELD_DATA = '/fields'

class FieldService {
    getAllFields() {
        return http.get(FIELD_DATA);
    }

    getField(pos) {
        return http.get(FIELD_DATA + "/" + pos)
    }

    createField(data) {
        return http.post(FIELD_DATA, data);
    }

    updateField(pos, data) {
        return http.put(FIELD_DATA + "/" + pos, data);
    }

    deleteField(data) {
        return http.delete(FIELD_DATA + "/" + data)
    }
}

export default new FieldService()