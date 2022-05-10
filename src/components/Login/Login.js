import logo from "./logo1.png"
import React from "react";
import {Button, Col, Form, FormText, Image, Row} from "react-bootstrap";

function Login() {
    return (
        <>
            <div className="bg-light d-flex justify-content-center" style={{height: '100vh'}}>
                <div className="border bg-white m-auto p-4" style={{width: '35vw'}}>
                    <Image className="d-block m-auto" src={logo} alt="logo"/>
                    <h3 className="text-center mb-4 mt-3">Log In</h3>
                    <Form className="p-4">
                        <Form.Group className="fw-light mb-3" controlId="email">
                            <Form.Control className="text-dark" type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group className="fw-light mb-3" controlId="password">
                            <Form.Control className="text-dark" type="password" placeholder="Password" />
                        </Form.Group>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="rememberMe">
                                    <Form.Check type="checkbox" label="Remember me"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="forgotPassword">
                                    <FormText>
                                        <a href="/" className="text-decoration-none fw-bold fs-6">
                                            Forgot your password?
                                        </a>
                                    </FormText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className="w-100 mb-3" variant="primary" type="submit">
                            Log In
                        </Button>
                        <div>
                            <p className="text-center">
                                Don't have account?
                                <a href="/registration" className="text-decoration-none fw-bold m-2">
                                    Sing Up
                                </a>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login;