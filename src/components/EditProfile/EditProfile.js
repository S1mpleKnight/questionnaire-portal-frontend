import {Form, Button, Container} from "react-bootstrap";
import {NavBar} from "../NavBar/NavBar";

function EditProfile() {
    return (
        <>
            <div className="bg-light" style={{height: '100vh'}}>
                <NavBar auth={true}/>
                <Container style={{width: '35vw'}} className="bg-white border mt-4 p-0">
                    <div className="mt-3 m-xl-3 m-sm-3">
                        <h3>Edit profile</h3>
                    </div>
                    <hr/>
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
                            SAVE
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default EditProfile;
