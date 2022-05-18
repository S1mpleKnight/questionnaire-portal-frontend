import {NavBar} from "../../components/NavBar/NavBar";
import {Button, Container, Form} from "react-bootstrap";
import React, {Component} from "react";
import UserService from "../../services/UserService";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this)
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
        this.state = {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
            message: "",
            success: ""
        }
    }

    onChangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
        })
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    onChangeConfirmPassword(e) {
        this.setState({
            newPasswordConfirm: e.target.value
        })
    }

    validatePassword = (password) => {
        return String(password).trim().length >= 10 && String(password).trim().length <= 255
    }

    handleValidation() {
        if (!this.state.oldPassword) {
            this.setState({message: "Invalid current password length (from 10 to 255)"})
            return false;
        }
        if (!this.validatePassword(this.state.oldPassword)) {
            this.setState({message: "Invalid current password length (from 10 to 255)"})
            return false;
        }

        if (!this.state.newPassword) {
            this.setState({message: "Invalid new password length (from 10 to 255)"})
            return false
        }
        if (!this.validatePassword(this.state.newPassword)) {
            this.setState({message: "Invalid new password length (from 10 to 255)"})
            return false
        }

        if (!this.state.newPasswordConfirm) {
            this.setState({message: "Invalid confirmation password length (from 10 to 255)"})
            return false;
        }
        if (!this.validatePassword(this.state.newPasswordConfirm)) {
            this.setState({message: "Invalid confirmation password length (from 10 to 255)"})
            return false;
        }

        if (this.state.newPasswordConfirm.localeCompare(this.state.newPassword) !== 0) {
            this.setState({message: "Confirmation password is not correct"})
            return false
        }

        return true;
    }

    onHandleSubmit(e) {
        e.preventDefault();

        this.setState({
            success: "",
            error: ""
        })

        if (this.handleValidation()) {
            const {oldPassword, newPassword} = this.state
            UserService.updatePassword({oldPassword, newPassword})
                .then(
                    (r) => this.setState(
                        {
                            success: "Password updated successfully"
                        }
                    ),
                    error => {
                        this.setState({message: error.response.data})
                    }
                )
        }
    }

    render() {
        return (
            <>
                <div className="bg-light" style={{height: '100vh'}}>
                    <NavBar auth={true}/>
                    <Container style={{width: '35vw'}} className="bg-white border mt-4 p-0">
                        <div className="mt-3 m-xl-3 m-sm-3">
                            <h3>Change password</h3>
                        </div>
                        <hr/>
                        <Form noValidate className="px-5 py-4" onSubmit={this.onHandleSubmit}>
                            <Form.Group className="fw-light mb-3" controlId="oldPassword">
                                <Form.Label className="text-muted">
                                    Current Password<span className="text-danger required">*</span>
                                </Form.Label>
                                <Form.Control className="text-dark" type="password"
                                              onChange={this.onChangeOldPassword}/>
                            </Form.Group>
                            <Form.Group className="fw-light mb-3" controlId="newPassword">
                                <Form.Label className="text-muted">
                                    New Password<span className="text-danger required">*</span>
                                </Form.Label>
                                <Form.Control className="text-dark" type="password"
                                              onChange={this.onChangeNewPassword}/>
                            </Form.Group>
                            <Form.Group className="fw-light mb-3" controlId="confirmNewPassword">
                                <Form.Label className="text-muted">
                                    Confirm New Password<span className="text-danger required">*</span>
                                </Form.Label>
                                <Form.Control className="text-dark" type="password"
                                              onChange={this.onChangeConfirmPassword}/>
                            </Form.Group>
                            {this.state.message && (
                                <Form.Group className="fw-light mb-3">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </Form.Group>
                            )}
                            {this.state.success && (
                                <Form.Group className="fw-light mb-3">
                                    <div className="alert alert-success" role="alert">
                                        {this.state.success}
                                    </div>
                                </Form.Group>
                            )}
                            <Button className="w-25" variant="primary" type="submit">
                                CHANGE
                            </Button>
                        </Form>
                    </Container>
                </div>
            </>
        )
    }
}

export default ChangePassword;