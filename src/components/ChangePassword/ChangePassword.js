import {NavBar} from "../NavBar/NavBar";
import {Button, Container, Form} from "react-bootstrap";

function ChangePassword() {
    return (
        <>
            <div className="bg-light" style={{height: '100vh'}}>
                <NavBar/>
                <Container style={{width: '35vw'}} className="bg-white border mt-4 p-0">
                    <div className="mt-3 m-xl-3 m-sm-3">
                        <h3>Change password</h3>
                    </div>
                    <hr/>
                    <Form className="px-5 py-4">
                        <Form.Group className="fw-light mb-3" controlId="oldPassword">
                            <Form.Label className="text-muted">
                                Current Password<span className="text-danger required">*</span>
                            </Form.Label>
                            <Form.Control className="text-dark" type="password"/>
                        </Form.Group>
                        <Form.Group className="fw-light mb-3" controlId="newPassword">
                            <Form.Label className="text-muted">
                                New Password<span className="text-danger required">*</span>
                            </Form.Label>
                            <Form.Control className="text-dark" type="password"/>
                        </Form.Group>
                        <Form.Group className="fw-light mb-3" controlId="confirmNewPassword">
                            <Form.Label className="text-muted">
                                Confirm New Password<span className="text-danger required">*</span>
                            </Form.Label>
                            <Form.Control className="text-dark" type="password"/>
                        </Form.Group>
                        <Button className="w-25" variant="primary" type="submit">
                            CHANGE
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default ChangePassword;