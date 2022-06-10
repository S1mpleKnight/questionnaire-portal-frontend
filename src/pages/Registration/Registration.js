import logo from "./logo1.png"
import {Button, Form, Image} from "react-bootstrap";
import React from "react";
import AuthService from "../../services/AuthService";
import {Navigate} from "react-router-dom";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.onChangeFirstname = this.onChangeFirstname.bind(this)
        this.onChangeLastname = this.onChangeLastname.bind(this)
        this.onChangePhone = this.onChangePhone.bind(this)
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
            phone: "",
            message: "",
            registered: false
        };
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        })
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    handleValidation() {
        if (!this.state.email && typeof this.state.email !== "undefined") {
            if (!this.validateEmail(this.state.email)) {
                this.setState({message: "Email is not valid"})
                return false;
            }
        }

        if (!this.state.password && typeof this.state.password !== "undefined") {
            this.setState({message: "Password cannot be empty"});
            return false;
        }
        if (this.state.password.length < 10) {
            this.setState({message: "Password length must be greater, than 9 symbols"});
            return false;
        }

        if ((!this.state.confirmPassword && typeof this.state.confirmPassword !== "undefined")
            || (this.state.confirmPassword.localeCompare(this.state.password) !== 0)) {
            this.setState({message: "Invalid confirm password field"});
            return false;
        }

        if (!this.state.firstname && typeof this.state.firstname !== "undefined") {
            this.setState({message: "Firstname cannot be empty"});
            return false;
        }
        if (!this.validateNames(this.state.firstname)) {
            this.setState({message: "Firstname - (from 2 to 35) symbols"});
            return false;
        }

        if (!this.state.lastname && typeof this.state.lastname !== "undefined") {
            this.setState({message: "Lastname cannot be empty"});
            return false;
        }
        if (!this.validateNames(this.state.lastname)) {
            this.setState({message: "Lastname - (from 2 to 35) symbols"});
            return false;
        }

        if (!this.state.phone && typeof this.state.phone !== "undefined") {
            this.setState({message: "Phone cannot be empty"});
            return false;
        }
        if (!this.validatePhone(this.state.phone)) {
            this.setState({message: "Phone - (from 11 to 14) numbers"});
            return false;
        }

        return true;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            AuthService.register(
                this.state.firstname,
                this.state.lastname,
                this.state.phone,
                this.state.email,
                this.state.password
            ).then(
                () => this.setState({registered: true}),
                error => {
                    const errMsg = (error.response && error.response.data && error.response.data.message)
                        || error.message()
                        || error.toString()
                    this.setState({errors: errMsg})
                }
            )
        }
    }

    validateNames = (name) => {
        return String(name).length >= 2 && String(name).length <= 34 && String(name).toLowerCase().match(/[a-zA-Z]+/)
    }

    validatePhone = (phone) => {
        return String(phone).length >= 11 && String(phone).length <= 14 && String(phone).toLowerCase().match(/^(\+)?[0-9]+/)
    }

    validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    render() {
        if (this.state.registered) {
            return <Navigate to="/login"/>
        }
        return (
            <>
                <div className="bg-light d-flex justify-content-center" style={{height: '100vh'}}>
                    <div className="border bg-white m-auto p-4" style={{width: '35vw'}}>
                        <Image className="d-block m-auto" src={logo} alt="logo"/>
                        <h3 className="text-center mb-4 mt-3">
                            Sing Up
                        </h3>
                        <Form noValidate className="p-4" onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Control
                                    className="text-dark"
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.onChangeEmail}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Control
                                    className="text-dark"
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.onChangePassword}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Control
                                    className="text-dark"
                                    type="password"
                                    placeholder="Confirm password"
                                    onChange={this.onChangeConfirmPassword}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Control
                                    className="text-dark"
                                    type="text"
                                    placeholder="First Name"
                                    onChange={this.onChangeFirstname}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Control
                                    className="text-dark"
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={this.onChangeLastname}
                                />
                            </Form.Group>
                            <Form.Group className="fw-light mb-3" controlId="phone" onChange={this.onChangePhone}>
                                <Form.Control type="input" placeholder="Phone Number"/>
                            </Form.Group>
                            {this.state.message && (
                                <Form.Group className="fw-light mb-3">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </Form.Group>
                            )}
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
}

export default Registration;