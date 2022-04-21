import React from 'react';
import {useQueryAclUserFind} from "../hooks/fetch/useAclUser";

const SettingsPage = () => {
    const queryAclUserFind = useQueryAclUserFind(1000, 0);
    const createUser = queryAclUserFind.data?.data?.users ?? []
    return (
        <div>
            <div style={{fontSize: '1.75em', textAlign: 'center'}}>
                ||| SettingsPage |||
            </div>
        </div>
    );
};

export default SettingsPage;