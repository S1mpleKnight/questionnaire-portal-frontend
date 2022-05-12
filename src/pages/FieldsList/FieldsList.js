import {NavBar} from "../../components/NavBar/NavBar";
import {Button, Col, Container, Dropdown, DropdownButton, Form, Modal, Pagination, Row, Table} from "react-bootstrap";
import {useState} from "react";

function FieldsList() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="bg-light" style={{height: '100vh'}}>
                <NavBar auth={true}/>
                <Container style={{width: '70vw'}} className="bg-white border mt-4 p-0">
                    <div className="d-flex justify-content-between p-3">
                        <h3>Fields</h3>
                        <Button onClick={handleShow}>
                            ADD FIELD
                        </Button>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add Field</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="p-3">
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
                                                <Form.Control type="input"/>
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
                                                <Form.Select>
                                                    <option>Combobox</option>
                                                    <option>Checkbox</option>
                                                    <option>Date</option>
                                                    <option>Radiobutton</option>
                                                    <option>Multi line text</option>
                                                    <option>Single line text</option>
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
                                                        <span className="text-danger required">*</span>
                                                    </Form.Label>
                                                </div>
                                            </Col>
                                            <Col>
                                                <Form.Control as="textarea" rows={5}/>
                                            </Col>
                                            <Col xs={3}/>
                                        </Row>
                                    </Form.Group>
                                    <div className="d-flex justify-content-center">
                                        <Row>
                                            <Col>
                                                <Form.Group id="required">
                                                    <Form.Check type="checkbox" label="Required"/>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group id="isActive">
                                                    <Form.Check type="checkbox" label="Is Active"/>
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                    </div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="white" className="border" style={{width: '100px'}}
                                        onClick={handleClose}>
                                    <p className="fw-bold m-0">CANCEL</p>
                                </Button>
                                <Button variant="primary" style={{width: '100px'}}>
                                    SAVE
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <hr className="m-0"/>
                    <div className="p-3">
                        <Table striped hover>
                            <thead>
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
                            </thead>
                            <tbody>
                            <tr>
                                <td>Hello</td>
                                <td>Single Line text</td>
                                <td>True</td>
                                <td>True</td>
                                <td className="d-flex justify-content-end">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-pen mx-2" viewBox="0 0 16 16">
                                            <path
                                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-trash mx-2" viewBox="0 0 16 16">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd"
                                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
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

export default FieldsList;