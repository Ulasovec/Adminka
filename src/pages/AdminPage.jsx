import React from 'react';
import {useQuerySession} from "../hooks/fetch/QuerySession";
import {useQueryRole} from "../hooks/fetch/QueryRole";

const AdminPage = () => {

    const querySession = useQuerySession();
    const queryRole = useQueryRole();
    return (
        <div style={{fontSize: '1.75em',textAlign:'center'}}>
            ||| HomePage {queryRole?.data?.data?.name} |||

        </div>
    );
};

export default AdminPage;