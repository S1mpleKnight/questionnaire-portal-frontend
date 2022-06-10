import {Button, Container, Form} from "react-bootstrap";
import {NavBar} from "../../components/NavBar/NavBar";
import React, {Component} from "react";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import {Navigate} from "react-router-dom";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this)
        this.onChangeLastname = this.onChangeLastname.bind(this)
        this.onChangePhone = this.onChangePhone.bind(this)
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            phone: "",
            message: "",
        }
    }

    componentDidMount() {
        UserService.getProfileData()
            .then(
                (r) => {
                    this.setState({
                        email: r.data.email,
                        phone: r.data.phone,
                        lastname: r.data.lastname,
                        firstname: r.data.firstname
                    })
                },
                error => {
                    this.setState({message: error.response.data})
                }
            )
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

    handleValidation() {
        if (!this.state.email) {
            this.setState({message: "Email is not valid"})
            return false
        }
        if (!this.validateEmail(this.state.email)) {
            this.setState({message: "Email is not valid"})
            return false;
        }

        if (!this.state.firstname) {
            this.setState({message: "Firstname cannot be empty"});
            return false;
        }
        if (!this.validateNames(this.state.firstname)) {
            this.setState({message: "Firstname - (from 2 to 35) symbols"});
            return false;
        }

        if (!this.state.lastname) {
            this.setState({message: "Lastname cannot be empty"});
            return false;
        }
        if (!this.validateNames(this.state.lastname)) {
            this.setState({message: "Lastname - (from 2 to 35) symbols"});
            return false;
        }

        if (!this.state.phone) {
            this.setState({message: "Phone cannot be empty"});
            return false;
        }
        if (!this.validatePhone(this.state.phone)) {
            this.setState({message: "Phone - (from 12 to 15) numbers"});
            return false;
        }

        return true;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            const {firstname, lastname, email, phone} = this.state
            UserService.updateProfileData({firstname, lastname, email, phone}).then(
                (r) => this.setState(
                    {
                        firstname: r.data.firstname,
                        lastname: r.data.lastname,
                        phone: r.data.phone,
                        email: r.data.email
                    }),
                error => {
                    const errMsg = (error.response && error.response.data && error.response.data.message)
                        || error.message()
                        || error.toString()
                    this.setState({errors: errMsg})
                }
            )
            AuthService.logout()
        }
    }

    validateNames = (name) => {
        return String(name).length >= 2 && String(name).length <= 34 && String(name).toLowerCase().match(/[a-zA-Z]+/)
    }

    validatePhone = (phone) => {
        return String(phone).length >= 12 && String(phone).length <= 15 && String(phone).toLowerCase().match(/^(\+)?[0-9]+/)
    }

    validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    render() {
        const user = AuthService.getCurrentUser()
        if (!(user && user.token && user.token.toString() !== "null")) {
            return <Navigate to="/login"/>
        }
        return (
            <>
                <div className="bg-light" style={{height: '100vh'}}>
                    <NavBar auth={true}/>
                    <Container style={{width: '35vw'}} className="bg-white border mt-4 p-0">
                        <div className="mt-3 m-xl-3 m-sm-3">
                            <h3>Edit profile</h3>
                        </div>
                        <hr/>
                        <Form noValidate className="px-5 py-4" onSubmit={this.handleSubmit}>
                            <Form.Group className="fw-light mb-3" controlId="firstname">
                                <Form.Label className="text-muted">First Name</Form.Label>
                                <Form.Control
                                    value={this.state.firstname}
                                    className="text-dark"
                                    type="text"
                                    placeholder="Enter first name"
                                    onChange={this.onChangeFirstname}
                                />
                            </Form.Group>
                            <Form.Group className="fw-light mb-3" controlId="lastname">
                                <Form.Label className="text-muted">Last Name</Form.Label>
                                <Form.Control
                                    value={this.state.lastname}
                                    type="text"
                                    placeholder="Enter last name"
                                    onChange={this.onChangeLastname}
                                />
                            </Form.Group>
                            <Form.Group className="fw-light mb-3" controlId="email" required>
                                <Form.Label className="text-muted">Email</Form.Label>
                                <span className="text-danger required">
                                    *
                                </span>
                                <Form.Control
                                    value={this.state.email}
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={this.onChangeEmail}
                                />
                            </Form.Group>
                            <Form.Group className="fw-light mb-3" controlId="phone">
                                <Form.Label className="is-invalid text-muted">Phone Number</Form.Label>
                                <Form.Control
                                    value={this.state.phone}
                                    type="input"
                                    placeholder="Enter phone number"
                                    onChange={this.onChangePhone}
                                />
                            </Form.Group>
                            {this.state.message && (
                                <Form.Group className="fw-light mb-3">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </Form.Group>
                            )}
                            <Button className="w-25" variant="primary" type="submit">
                                SAVE
                            </Button>
                        </Form>
                    </Container>
                </div>
            </>
        )
    }
}

export default EditProfile;
