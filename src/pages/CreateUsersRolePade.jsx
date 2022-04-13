import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useQueryAclUserGetById} from "../hooks/fetch/useAclUser";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import TableSelectRole from "../components/BootstrapTable/TablSelectRole";

const CreateUsersRolePade = () => {
    const id = useParams();
    const user = useQueryAclUserGetById(id.id);
    const [open,setOpen] = useState(false)
console.log(user)
    function openTable(){
    setOpen(true)
    }

    return (
        <Container>
            <h1 style={{fontSize: '1.75em',textAlign:'center'}}>
                ||| User information |||
            </h1>
            <Row>
                <Col>
                    <Card border="success" style={{ width: '18rem' }}>
                    <Card.Header>UserName:</Card.Header>
                    <Card.Body>
                        <Card.Title>{user.data?.data?.name }</Card.Title>
                        <Card.Text>
                            User has a unique Id : {user.data?.data?.id}.
                        </Card.Text>
                        <Card.Text>
                            Please select a role.

                        </Card.Text>
                        <Card.Text>

                            <Button variant="success"
                                    onClick={openTable}>Select</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                    </Col>
                <Col>
                    {(open)? <TableSelectRole/>
                        :null
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default CreateUsersRolePade;