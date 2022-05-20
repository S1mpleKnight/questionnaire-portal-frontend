import {NavBar} from "../../components/NavBar/NavBar";
import {Button, Container, Form} from "react-bootstrap";
import React, {Component} from "react";
import AuthService from "../../services/AuthService";
import QuestionnaireService from "../../services/QuestionnaireService";
import {useParams} from "react-router-dom";

const OPTIONS_DELIMITER = "~!@#%&_&%#@!~";

class Questionnaire extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.createAnswerField = this.createAnswerField.bind(this)
        this.state = {
            fields: [],
            answers: [],
            message: "",
            param: props.params.questionnaireId.toString()
        }
    }

    //todo: add handlers to values

    createAnswerField(field) {
        if (!field.active) {
            return ""
        }
        const requiredStar = field.required
            ? <span className="text-danger required">*</span>
            : "";
        let controlElement = ""
        // eslint-disable-next-line default-case
        switch (field.fieldType) {
            case "DATE":
            case "SINGLE_LINE_TEXT":
                controlElement = (<Form.Control className="text-dark" type="text"/>)
                break
            case "MULTILINE_TEXT":
                controlElement = (<Form.Control className="text-dark" type="textarea"/>)
                break
            case "RADIO_BUTTON":
                controlElement = field.fieldOptions.replaceAll(OPTIONS_DELIMITER, " ").split(" ")
                    .map((option) => {
                        return (<Form.Check type="radio">{option}</Form.Check>)
                    })
                break
            case "CHECKBOX":
                controlElement = (<Form.Check type="checkbox"/>)
                break
            case "COMBOBOX":
                controlElement = (
                    <Form.Select>
                        {
                            field.fieldOptions.replaceAll(OPTIONS_DELIMITER, " ").split(" ")
                                .map((option) => {
                                    return (<option key={option}>{option}</option>)
                                })
                        }
                    </Form.Select>
                )
                break
        }
        return (
            <Form.Group key={field.label} className="fw-light mb-3">
                <Form.Label className="text-muted fw-bold">{field.label}{requiredStar}</Form.Label>
                {controlElement}
            </Form.Group>
        )
    }

    handleSubmit(e) {
        e.preventDefault()


    }

    componentDidMount() {
        QuestionnaireService.getQuestionnaire(this.state.param)
            .then(
                (r) => {
                    console.log(r)
                    this.setState({
                        fields: r.data,
                    })
                },
                error => {
                    this.setState({message: error.response.data})
                }
            )
    }

    render() {
        return (
            <>
                <div className="bg-light" style={{height: '100vh'}}>
                    <NavBar auth={AuthService.getCurrentUser()}/>
                    <Container style={{width: '35vw'}} className="bg-white border mt-4 p-0">
                        <Form noValidate className="px-5 py-4">
                            {this.state.fields.map((field) => this.createAnswerField(field))}
                            <Button className="w-25" variant="primary" type="submit">
                                SUBMIT
                            </Button>
                        </Form>
                        {this.state.message && (
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        )}
                    </Container>
                </div>
            </>
        )
    }
}

export default (props) => (
    <Questionnaire {...props} params={useParams()}/>
)