import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from "./logo1.png"

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {authorized: props.auth}
    }

    render() {
        if (this.state.authorized) {
            return (
                <>
                    <Navbar bg="white">
                        <Container bg="white">
                            <Navbar.Brand>
                                <img
                                    src={logo} alt="logo" className="d-inline-block align-top"
                                />
                            </Navbar.Brand>
                            <Nav>
                                <Nav.Link href="/fields" className="mx-4 fw-bold">Field</Nav.Link>
                                <Nav.Link href="/responses" className="mx-4 fw-bold">Responses</Nav.Link>
                                <NavDropdown className="mx-4 fw-bold " title="John Doe" id="navbarDropdown">
                                    <NavDropdown.Item href="/profile">Edit Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/password">Change Password</NavDropdown.Item>
                                    <NavDropdown.Item href="/login">Log Out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
            )
        } else {
            return (
                <>
                    <Navbar bg="white">
                        <Container bg="white">
                            <Navbar.Brand>
                                <img
                                    src={logo} alt="logo" className="d-inline-block align-top"
                                />
                            </Navbar.Brand>
                            <Nav>
                                <Nav.Link href="/login" className="mx-4 fw-bold">Log In</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
            )
        }
    }
}