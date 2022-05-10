import {NavBar} from "../NavBar/NavBar";
import {Button, Container, Dropdown, DropdownButton, Pagination, Table} from "react-bootstrap";

function FieldsList() {
    return (
        <>
            <div className="bg-light" style={{height: '100vh'}}>
                <NavBar/>
                <Container style={{width: '70vw'}} className="bg-white border mt-4 p-0">
                    <div className="d-flex justify-content-between p-3">
                        <h3>Fields</h3>
                        <Button>
                            ADD FIELD
                        </Button>
                    </div>
                    <hr className="m-0"/>
                    <div className="p-3">
                        <Table striped hover>
                            <thead>
                                <th>
                                    <div className="d-inline-block">
                                        Label
                                    </div>
                                </th>
                                <th>
                                    <div className="d-inline-block">
                                        Type
                                    </div>
                                </th>
                                <th>
                                    <div className="d-inline-block">
                                        Required
                                    </div>
                                </th>
                                <th colSpan={2}>
                                    <div className="d-inline-block">
                                        Is Active
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Hello</td>
                                <td>Single Line text</td>
                                <td>True</td>
                                <td>True</td>
                                <td className="d-flex justify-content-end">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-pen mx-2" viewBox="0 0 16 16">
                                            <path
                                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-trash mx-2" viewBox="0 0 16 16">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd"
                                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
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

export default FieldsList;