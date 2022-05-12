import {NavBar} from "../../components/NavBar/NavBar";
import {Button, Container, Form} from "react-bootstrap";

function Questionnaire() {
    return (
        <>
            <div className="bg-light" style={{height: '100vh'}}>
                <NavBar auth={false}/>
                <Container style={{width: '35vw'}} className="bg-white border mt-4 p-0">
                    <Form className="px-5 py-4">
                        <Form.Group className="fw-light mb-3" controlId="firstname">
                            <Form.Label className="text-muted">First Name</Form.Label>
                            <Form.Control className="text-dark" type="text" placeholder="Enter first name" />
                        </Form.Group>
                        <Form.Group className="fw-light mb-3" controlId="lastname">
                            <Form.Label className="text-muted">Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" />
                        </Form.Group>
                        <Form.Group className="fw-light mb-3" controlId="email" required>
                            <Form.Label className="text-muted">Email</Form.Label>
                            <span className="text-danger required">
                                    *
                                </span>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="fw-light mb-3" controlId="phone">
                            <Form.Label className="is-invalid text-muted">Phone Number</Form.Label>
                            <Form.Control type="input" placeholder="Enter phone number"/>
                        </Form.Group>
                        <Button className="w-25" variant="primary" type="submit">
                            SUBMIT
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default Questionnaire;