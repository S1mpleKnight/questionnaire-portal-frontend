import http from './HttpAuthHeaderService'

const FIELD_DATA = '/fields'
const ID_DATA = '/id'

class FieldService {

    constructor() {
        this.state = {
            userId: false
        }
    }

    getUserId() {
        http.get(ID_DATA)
            .then(response => {
                if (response.data) {
                    localStorage.setItem("userId", response.data)
                }
            })
    }

    getAllFields() {
        if (!this.state.userId) {
            this.getUserId()
            this.state.userId = true
        }
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