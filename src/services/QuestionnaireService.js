import axios from "axios";

const API_URL = "http://localhost:8080/api/"
// const API_URL = "https://questionnaire-portal-system.herokuapp.com/api/"
const QUESTIONNAIRE_ENDPOINT = 'questionnaires'
const RESPONSE_ENDPOINT = 'responses'

class QuestionnaireService {
    getQuestionnaire(id) {
         return axios.get(
            API_URL + QUESTIONNAIRE_ENDPOINT + "/" + id
        )
    }

    postResponses(id, data) {
        return axios.post(
            API_URL + RESPONSE_ENDPOINT + "/" + id,
            data
        )
    }
}

export default new QuestionnaireService()