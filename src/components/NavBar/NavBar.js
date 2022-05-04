import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from "./logo.png"

export function NavBar() {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="logo" className="d-inline-block align-top"/>
                        {' '}
                        Questionnaire portal
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/">Field</Nav.Link>
                        <Nav.Link href="/">Responses</Nav.Link>
                        <NavDropdown title="John Doe" id="navbarDropdown">
                            <NavDropdown.Item href="/">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/">Change Password</NavDropdown.Item>
                            <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}