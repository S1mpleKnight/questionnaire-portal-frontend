import {NavBar} from "../../components/NavBar/NavBar";
import {Container, Dropdown, DropdownButton, Pagination, Table} from "react-bootstrap";
import React, {Component} from "react";
import AuthService from "../../services/AuthService";
import {Navigate} from "react-router-dom";
import ResponseService from "../../services/ResponseService";
import FieldService from "../../services/FieldService";

class Responses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            responses: []
        }
    }

    componentDidMount() {
        ResponseService.getAllFields()
            .then(
                (r) => {
                    this.setState({
                        responses: r.data.content.filter((response) => response.responses.length > 0),
                    })
                },
                error => {
                    this.setState({message: error.response.data})
                }
            )
        FieldService.getAllFields()
            .then(
                (r) => {
                    this.setState({
                        fields: r.data.content,
                    })
                },
                error => {
                    this.setState({message: error.response.data})
                }
            )
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
                    <Container style={{width: '70vw'}} className="bg-white border mt-4 p-0">
                        <div className="d-flex justify-content-between p-3">
                            <h3>Responses</h3>
                        </div>
                        <hr className="m-0"/>
                        <div className="p-3">
                            <Table striped hover>
                                <thead>
                                <tr>
                                    {
                                        this.state.fields.map((field => (
                                            <th key={field.label}>
                                                <div className="d-inline-block">
                                                    {field.label}
                                                </div>
                                            </th>
                                        )))
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.responses.map((response) => (
                                        <tr key={response.id}>
                                            {response.responses.map((responseValue) =>
                                                (<td key={responseValue.position}>{responseValue.value}</td>))}
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                            {this.state.message && (
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            )}
                            <div className="d-flex justify-content-between">
                                <label>1-3 of 3</label>
                                <Pagination>
                                    <Pagination.Prev/>
                                    <Pagination.Item active>{1}</Pagination.Item>
                                    <Pagination.Next/>
                                </Pagination>
                                <div className="pb-3">
                                    <DropdownButton id="sortingType" title="All" variant="white" className="border">
                                        <Dropdown.Item href="/">Some action</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}

export default Responses;