import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useQueryAclUserGetById} from "../hooks/fetch/useAclUser";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import TableSelectRole from "../components/BootstrapTable/TablSelectRole";
import {useQueryAclUsersRolesFind} from "../hooks/fetch/useAclUsersRoles";
import {useQueryAclApplicationFind} from "../hooks/fetch/useAclApplication";
import {useQueryAclRoleFind} from "../hooks/fetch/useAclRole";

const CreateUsersRolePade = () => {
    const params = useParams();
    const user = useQueryAclUserGetById(params.id);

    // Получим записи для данного пользователя
    const queryAclUsersRolesFind = useQueryAclUsersRolesFind()
    const allUsersAndRoles = queryAclUsersRolesFind.data?.data?.users_roles ?? []
    const appAndRoles = allUsersAndRoles.filter(item => item.user_id === params.id)

    // Список всех applications
    const queryAclApplicationFind = useQueryAclApplicationFind()
    const allApplications = queryAclApplicationFind.data?.data?.applications ?? []

    // Список всех ролей
    const allRoles = useQueryAclRoleFind().data?.data?.roles ?? []

    const [open, setOpen] = useState(false)

    function openTable() {
        setOpen(true)
    }

    return (
        <div>
            <h1 style={{fontSize: '1.75em', textAlign: 'center'}}>
                ||| User information |||
            </h1>
            <Row>
                <Col>
                    <Card border="success" style={{width: '18rem'}}>
                        <Card.Header>UserName:</Card.Header>
                        <Card.Body>
                            <Card.Title>{user.data?.data?.name}</Card.Title>
                            <Card.Text>
                                User has a unique Id : {user.data?.data?.id}.
                            </Card.Text>
                            <Card.Text>
                                Active status : {`${user.data?.data?.is_active}`}.
                            </Card.Text>
                            <Card.Text>
                                Applications | Roles:
                                <div>
                                    {appAndRoles.map(item => (
                                        <p key={item.id}>
                                            <pre>{item.application_id} | {item.role_id}</pre>
                                        </p>
                                    ))}
                                </div>
                            </Card.Text>
                            <Card.Text>
                                Please select a role.
                            </Card.Text>
                            <Card.Text>
                                <Button variant="success" onClick={openTable}>Select</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Form>
                        <Form.Select aria-label="App Default select">
                            <option>Выберите приложение</option>
                            {allApplications.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                            {/*<option value="1">One</option>*/}
                        </Form.Select>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Select aria-label="Role Default select">
                            <option>Выберите роль</option>
                            {allRoles.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </Form.Select>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {(open) ? <TableSelectRole/>
                        : null
                    }
                </Col>
            </Row>
        </div>
    );
};

export default CreateUsersRolePade;