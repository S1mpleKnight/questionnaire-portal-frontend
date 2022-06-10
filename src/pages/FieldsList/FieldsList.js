import {NavBar} from "../../components/NavBar/NavBar";
import {
    Breadcrumb, BreadcrumbItem,
    Button,
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    Modal,
    Pagination,
    Row,
    Table
} from "react-bootstrap";
import React, {Component} from "react";
import AuthService from "../../services/AuthService";
import {Navigate} from "react-router-dom";
import FieldService from "../../services/FieldService";

const OPTIONS_DELIMITER = "~!@#%&_&%#@!~";

class FieldsList extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setShow = this.setShow.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
        this.onLabelChange = this.onLabelChange.bind(this)
        this.onOptionsChange = this.onOptionsChange.bind(this)
        this.onActiveChange = this.onActiveChange.bind(this)
        this.onRequiredChange = this.onRequiredChange.bind(this)
        this.getFieldPosInList = this.getFieldPosInList.bind(this)
        this.deleteField = this.deleteField.bind(this)
        this.getUpdateFieldData = this.getUpdateFieldData.bind(this)
        this.state = {
            show: false,
            page: 0,
            size: 20,
            fields: [],
            modalMessage: "",
            modalSuccess: "",
            message: "",
            successMessage: "",
            label: "",
            fieldType: "COMBOBOX",
            fieldOptions: "",
            required: false,
            active: false,
            update: "",
            questionnaireUrl: "",
        }
    }

    onLabelChange(e) {
        this.setState({
            label: e.target.value
        })
    }

    onTypeChange(e) {
        this.setState({
            fieldType: e.target.value
        })
    }

    onOptionsChange(e) {
        this.setState({
            fieldOptions: e.target.value
        })
    }

    onRequiredChange(e) {
        this.setState({
            required: e.target.checked
        })
    }

    onActiveChange(e) {
        this.setState({
            active: e.target.checked
        })
    }

    getFieldPosInList(field) {
        return this.state.fields.indexOf(field)
    }

    deleteField(pos) {
        FieldService.deleteField(pos)
            .then(
                (r) => {
                    this.setState({
                        successMessage: "Field was successfully deleted"
                    })
                },
                error => {
                    this.setState({message: error.response.data})
                }
            )
    }

    getUpdateFieldData(pos) {
        this.setState({
            update: pos
        })
        FieldService.getField(pos)
            .then(
                (r) => {
                    if (r.data.fieldOptions) {
                        this.setState({
                            fieldOptions: r.data.fieldOptions.replaceAll(OPTIONS_DELIMITER, "\n")
                        })
                    }
                    this.setState({
                        label: r.data.label,
                        fieldType: r.data.fieldType.replaceAll("_", " "),
                        active: r.data.active,
                        required: r.data.required
                    })
                },
                error => {
                    this.setState({modalMessage: error.response.data})
                }
            )
        this.setShow(true)
    }

    componentDidMount() {
        this.setState({
            questionnaireUrl : AuthService.getUserQuestionnaireUrl()
        })
        FieldService.getAllFields()
            .then(
                (r) => {
                    this.setState({
                        fields: r.data.content,
                    })
                },
                error => {
                    this.setState({message: error.response.data})
                }
            )

    }

    setShow(value) {
        this.setState({
            show: value
        })
    }

    validateInput() {
        if (!this.state.label || this.state.label.length <= 0) {
            this.setState({
                modalMessage: "Label value can not be null"
            })
            return false
        }

        if (!this.state.fieldType) {
            this.setState({
                modalMessage: "Type can not be null"
            })
            return false
        }

        if (this.state.fieldType === 'COMBOBOX' || this.state.fieldType === 'RADIOBUTTON') {
            if (!(this.state.fieldOptions && this.state.fieldOptions.toString().trim().length > 0)) {
                this.setState({
                    modalMessage: "Options can not be empty"
                })
                return false
            }
        }

        return true
    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({
            modalMessage: "",
            modalSuccess: "",
            successMessage: "",
            message: ""
        })

        if (this.validateInput()) {
            let {label, active, required, fieldType, fieldOptions} = this.state
            fieldType = fieldType.toString().replaceAll(" ", "_")
            fieldOptions = fieldOptions ? fieldOptions.toString().replaceAll("\n", OPTIONS_DELIMITER) : ""
            if (this.state.update) {
                FieldService.updateField(this.state.update, {label, active, required, fieldType, fieldOptions})
                    .then(
                        (r) => {
                            this.setState({
                                label: r.data.label,
                                fieldType: r.data.fieldType,
                                fieldOptions: r.data.fieldOptions,
                                active: r.data.active,
                                required: r.data.required,
                                modalSuccess: "Field was successfully updated",
                            })
                        },
                        error => {
                            this.setState({modalMessage: error.response.data})
                        }
                    )
            } else {
                FieldService.createField({label, active, required, fieldType, fieldOptions})
                    .then(
                        (r) => {
                            this.setState({
                                modalSuccess: "Field was successfully created",
                                label: "",
                                fieldType: "COMBOBOX",
                                fieldOptions: ""
                            })
                        },
                        error => {
                            this.setState({
                                modalMessage: error.response.data
                            })
                        }
                    )
            }
        }
    }

    render() {
        const handleClose = () => {
            this.setShow(false);
            this.setState({
                modalMessage: "",
                modalSuccess: "",
                update: "",
                label: "",
                fieldType: "COMBOBOX",
                fieldOptions: "",
                required: false,
                active: false
            })
        }
        const handleShow = () => this.setShow(true);
        const user = AuthService.getCurrentUser()
        if (!(user && user.token && user.token.toString() !== "null")) {
            return <Navigate to="/login"/>
        }
        return (
            <>
                <div className="bg-light" style={{height: '100vh'}}>
                    <NavBar auth={true}/>
                    <Container style={{width: '70vw'}} className="bg-white border mt-4 p-0">
                        <div className="d-flex justify-content-between p-3">
                            <h3>Fields</h3>
                            <Breadcrumb>
                                <BreadcrumbItem href={this.state.questionnaireUrl}>Questionnaire</BreadcrumbItem>
                            </Breadcrumb>
                            <Button onClick={handleShow}>
                                ADD FIELD
                            </Button>
                            <Modal
                                show={this.state.show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.update ? "Update field" : "Add Field"}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form noValidate className="p-3">
                                        <Form.Group id="label" className="mb-3">
                                            <Row>
                                                <Col xs={3}>
                                                    <div className="d-flex justify-content-end">
                                                        <Form.Label>
                                                            Label
                                                            <span className="text-danger required">*</span>
                                                        </Form.Label>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        value={this.state.label}
                                                        onChange={this.onLabelChange}
                                                        type="input"
                                                    />
                                                </Col>
                                                <Col xs={3}/>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group id="type" className="mb-3">
                                            <Row>
                                                <Col xs={3}>
                                                    <div className="d-flex justify-content-end">
                                                        <Form.Label>
                                                            Type
                                                            <span className="text-danger required">*</span>
                                                        </Form.Label>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <Form.Select onChange={this.onTypeChange}
                                                        defaultValue={this.state.fieldType}>
                                                        <option>COMBOBOX</option>
                                                        <option>CHECKBOX</option>
                                                        <option>DATE</option>
                                                        <option>RADIO BUTTON</option>
                                                        <option>MULTILINE TEXT</option>
                                                        <option>SINGLE LINE TEXT</option>
                                                    </Form.Select>
                                                </Col>
                                                <Col xs={3}/>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group id="options" className="mb-3">
                                            <Row>
                                                <Col xs={3}>
                                                    <div className="d-flex justify-content-end">
                                                        <Form.Label>
                                                            Options
                                                        </Form.Label>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        onChange={this.onOptionsChange}
                                                        as="textarea"
                                                        value={this.state.fieldOptions}
                                                        rows={5}
                                                    />
                                                </Col>
                                                <Col xs={3}/>
                                            </Row>
                                        </Form.Group>
                                        <div className="d-flex justify-content-center">
                                            <Row>
                                                <Col>
                                                    <Form.Group id="required">
                                                        <Form.Check
                                                            checked={this.state.required}
                                                            type="checkbox"
                                                            label="Required"
                                                            onChange={this.onRequiredChange}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group id="isActive">
                                                        <Form.Check
                                                            checked={this.state.active}
                                                            type="checkbox"
                                                            label="Is Active"
                                                            onChange={this.onActiveChange}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        {this.state.modalMessage && (
                                            <Form.Group className="fw-light mt-3">
                                                <div className="alert alert-danger" role="alert">
                                                    {this.state.modalMessage}
                                                </div>
                                            </Form.Group>
                                        )}
                                        {this.state.modalSuccess && (
                                            <Form.Group className="fw-light mt-3">
                                                <div className="alert alert-success" role="alert">
                                                    {this.state.modalSuccess}
                                                </div>
                                            </Form.Group>
                                        )}
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="white" className="border" style={{width: '100px'}}
                                            onClick={handleClose}>
                                        <p className="fw-bold m-0">CANCEL</p>
                                    </Button>
                                    <Button variant="primary" style={{width: '100px'}} onClick={this.handleSubmit}>
                                        {this.state.update ? "UPDATE" : "SAVE"}
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <hr className="m-0"/>
                        <div className="p-3">
                            <Table striped hover>
                                <thead>
                                <tr>
                                    <th>
                                        <div className="d-inline-block">
                                            Label
                                        </div>
                                    </th>
                                    <th>
                                        <div className="d-inline-block">
                                            Type
                                        </div>
                                    </th>
                                    <th>
                                        <div className="d-inline-block">
                                            Required
                                        </div>
                                    </th>
                                    <th colSpan={2}>
                                        <div className="d-inline-block">
                                            Is Active
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.fields.map((field) => (
                                        <tr key={field.label}>
                                            <td>{field.label}</td>
                                            <td>{field.fieldType.toString().replaceAll("_", " ")}</td>
                                            <td>{field.required ? "True" : "False"}</td>
                                            <td>{field.active ? "True" : "False"}</td>
                                            <td className="d-flex justify-content-end">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         width="16"
                                                         height="16"
                                                         fill="currentColor"
                                                         className="bi bi-pen mx-2"
                                                         viewBox="0 0 16 16"
                                                         onClick={() => this.getUpdateFieldData(this.getFieldPosInList(field) + 1)}
                                                    >
                                                        <path
                                                            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         width="16"
                                                         height="16"
                                                         fill="currentColor"
                                                         className="bi bi-trash mx-2"
                                                         viewBox="0 0 16 16"
                                                         onClick={() => this.deleteField(this.getFieldPosInList(field) + 1)}
                                                    >
                                                        <path
                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path fillRule="evenodd"
                                                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                            {this.state.message && (
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            )}
                            {this.state.successMessage && (
                                <div className="alert alert-success" role="alert">
                                    {this.state.successMessage}
                                </div>
                            )}
                            <div className="d-flex justify-content-between">
                                <label>1-3 of 3</label>
                                <Pagination>
                                    <Pagination.Prev/>
                                    <Pagination.Item active>{1}</Pagination.Item>
                                    <Pagination.Next/>
                                </Pagination>
                                <div className="pb-3">
                                    <DropdownButton id="sortingType" title="All" variant="white" className="border">
                                        <Dropdown.Item href="/">Some action</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}

export default FieldsList;