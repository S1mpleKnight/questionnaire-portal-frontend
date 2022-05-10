import logo from "./logo1.png"
import {Button, Col, Form, FormText, Image, Row} from "react-bootstrap";
import React from "react";

function Registration() {
    return (
        <>
            <div className="bg-light d-flex justify-content-center" style={{height: '100vh'}}>
                <div className="border bg-white m-auto p-4" style={{width: '35vw'}}>
                    <Image className="d-block m-auto" src={logo} alt="logo"/>
                    <h3 className="text-center mb-4 mt-3">
                        Sing Up
                    </h3>
                    <Form className="p-4">
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Control className="text-dark" type="email" placeholder="Email" style={{}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Control className="text-dark" type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Control className="text-dark" type="password" placeholder="Confirm password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="firstname">
                            <Form.Control className="text-dark" type="text" placeholder="First Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastname">
                            <Form.Control className="text-dark" type="text" placeholder="Last Name" />
                        </Form.Group>
                        <Form.Group className="fw-light mb-3" controlId="phone">
                            <Form.Control type="input" placeholder="Phone Number"/>
                        </Form.Group>
                        <Button className="w-100 mb-3" variant="primary" type="submit">
                            Sign Up
                        </Button>
                        <div>
                            <p className="text-center">
                                Already have account?
                                <a href="/login" className="text-decoration-none fw-bold m-2">
                                    Log In
                                </a>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Registration;