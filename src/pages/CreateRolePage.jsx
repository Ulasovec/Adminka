import React, {useState} from 'react';
import CreateRolesForm from "../components/BootstrapForm/CreateRolesForm";
import useRolesNameReducer from "../store/reducers/CreateRoleReducer";
import CreateRoleModal from "../components/BootstrapModal/CreateRoleModal";
import {
    useMutationAclRoleCreate,
    useMutationAclRoleDelete,
    useMutationAclRoleUpdate,
    useQueryAclRoleFind
} from "../hooks/fetch/useAclRole";
import MyBootstrapTable from "../components/MyTable/MyBootstrapTable";

const CreateRolePage = () => {
    const {roles, setRolesName} = useRolesNameReducer();
    const [modal, setModal] = useState(false);
    const [putRole, setPutRole] = useState({});

    const queryAclRoleFind = useQueryAclRoleFind(100, 0)
    const rolesArray = queryAclRoleFind.data?.data?.roles ?? []
    const mutationAclRoleCreate = useMutationAclRoleCreate()
    const mutationAclRoleUpdate = useMutationAclRoleUpdate()
    const mutationAclRoleDelete = useMutationAclRoleDelete()

    console.log(rolesArray);

    function createRoles() {
        mutationAclRoleCreate.mutate(roles);
    }

    function deleteRoles(id) {
        //setRolesArray(rolesArray.filter(item => item.id !== id));
        mutationAclRoleDelete.mutate(id);
    }

    function putRoles(id) {
        setModal(true);
        setPutRole(rolesArray.filter(item => item.id === id)[0])
    }

    function updatePutRole({id: role_id, name, about, is_active}) {
        mutationAclRoleUpdate.mutate({role_id, name, about, is_active});
    }

    return (
        <div>
            <h1 style={{fontSize: '1.75em', textAlign: 'center'}}>||| Create Roles |||</h1>
            <CreateRolesForm roles={roles}
                             setRolesName={setRolesName}
                             handlerCreate={createRoles}
            />
            <MyBootstrapTable contentRow={rolesArray}/>

            {(modal)
                ? <CreateRoleModal
                    setModal={setModal}
                    putRole={putRole}
                    handlePutRole={updatePutRole}
                />
                : null
            }
        </div>
    );
};

export default CreateRolePage;