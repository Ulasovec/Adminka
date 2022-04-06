import React from 'react';
import {useQuerySession} from "../hooks/fetch/QuerySession";
import {useQueryRole} from "../hooks/fetch/QueryRole";

const AdminPage = () => {

    const querySession = useQuerySession();
    console.log(querySession)
    const queryRole = useQueryRole();
    return (
        <div style={{fontSize: '1.75em',textAlign:'center'}}>
            ||| Admin Role : {queryRole?.data?.data?.name} |||

        </div>
    );
};

export default AdminPage;