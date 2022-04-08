import React from 'react';
import {useQuerySession} from "../hooks/fetch/QuerySession";
import {useQueryRole} from "../hooks/fetch/QueryRole";
import {Container} from "react-bootstrap";

const AdminPage = () => {

    const querySession = useQuerySession();
    console.log(querySession)
    const queryRole = useQueryRole();
    return (
        <Container>
        <div style={{fontSize: '1.75em',textAlign:'center'}}>
            ||| Admin Role : {queryRole?.data?.data?.name} |||

        </div>
            </Container>
    );
};

export default AdminPage;