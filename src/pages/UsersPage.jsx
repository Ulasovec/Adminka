import React from 'react';
import {Container} from "react-bootstrap";
import BootstrapTable from "../components/BootstrapTable/BootstrapTable";

const UsersPage = () => {
    return (
        <Container>
        <h1 style={{fontSize: '1.75em',textAlign:'center'}}>
            ||| UsersPage |||
        </h1>
            <BootstrapTable/>
            </Container>
    );
};

export default UsersPage;