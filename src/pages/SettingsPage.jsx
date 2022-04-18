import React from 'react';
import {Container} from "react-bootstrap";
import {useQueryAclUserFind} from "../hooks/fetch/useAclUser";

const SettingsPage = () => {
    const queryAclUserFind = useQueryAclUserFind(1000, 0);
    const createUser = queryAclUserFind.data?.data?.users ?? []
    return (
        <Container>
        <div style={{fontSize: '1.75em',textAlign:'center'}}>
            ||| SettingsPage |||
        </div>
            </Container>
    );
};

export default SettingsPage;