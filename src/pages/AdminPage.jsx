import React from 'react';
import {useQuerySession} from "../hooks/fetch/QuerySession";
import {useQueryRole} from "../hooks/fetch/QueryRole";
import {useUserInfo} from "../hooks/fetch/useUserInfo";
import {Container} from "react-bootstrap";

const AdminPage = () => {

    //const querySession = useQuerySession();
    //console.log(querySession)
    //const queryRole = useQueryRole();
    const {user_name, role_name, role_about} = useUserInfo();

    return (
        <Container>
            <div style={{fontSize: '1.75em', textAlign: 'center'}}>
                {/*||| Admin Role : {queryRole?.data?.data?.name} |||*/}
                <p>||| User name: {user_name} |||</p>
                <p>||| User role: {role_name} |||</p>
                <p>||| Role description: {role_about} |||</p>

            </div>
        </Container>
    );
};

export default AdminPage;