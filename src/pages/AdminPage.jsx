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

            <div style={{fontSize: '1.75em', textAlign: 'center'}}>
                <h1>||| Admin Page |||</h1>
                <div style={{fontSize: '1.0em', textAlign: 'left'}}>
                    <p><b>User name</b>: {user_name}</p>
                    <p><b>User role</b>: {role_name}</p>
                    <p><b>Role description</b>: {role_about}</p>
                </div>
            </div>
    );
};

export default AdminPage;