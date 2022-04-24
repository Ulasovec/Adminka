import React, {useState} from 'react';
import CreateRolesForm from "../components/BootstrapForm/CreateRolesForm";
import useRolesNameReducer from "../store/reducers/CreateRoleReducer";
import {
    useMutationAclRoleCreate,
    useMutationAclRoleDelete,
    useMutationAclRoleUpdate,
    useQueryAclRoleFind
} from "../hooks/fetch/useAclRole";
import MyBootstrapTable from "../components/MyTable/MyBootstrapTable";
import MyPutModal from "../components/MyModal/MyPutModal";
import {Spinner} from "react-bootstrap";

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
        mutationAclRoleDelete.mutate(id);
    }

    function putRoles(id) {
        setModal(true);
        setPutRole(rolesArray.filter(item => item.id === id)[0]);
    }

    function updatePutRole({id: role_id, name, about, is_active}) {
        mutationAclRoleUpdate.mutate({role_id, name, about, is_active});
    }
    function deleteArray(userIdsToDelete) {
        userIdsToDelete.forEach(id => mutationAclRoleDelete.mutate(id));
    }
    if (queryAclRoleFind.isLoading) {
        return <Spinner animation="border" variant="secondary" />
    }

    if (queryAclRoleFind.isError) {
        return <span>Error: {queryAclRoleFind.error.message}</span>
    }
    return (
        <div>
            <h1 style={{fontSize: '1.75em', textAlign: 'center'}}>||| Create Roles |||</h1>
            <CreateRolesForm roles={roles}
                             setRolesName={setRolesName}
                             handlerCreate={createRoles}
            />
            <MyBootstrapTable contentRow={rolesArray}
                                deleteRow ={deleteRoles}
                                putRow={putRoles}
                                deleteArrayRow={deleteArray}

            />

            {/*{(modal)*/}
            {/*    ? <CreateRoleModal*/}
            {/*        setModal={setModal}*/}
            {/*        putRole={putRole}*/}
            {/*        handlePutRole={updatePutRole}*/}
            {/*    />*/}
            {/*    : null*/}
            {/*}*/}
            {(modal)
                ? <MyPutModal
                    setModal={setModal}
                    putForm={putRole}
                    handlePutForm={updatePutRole}
                />
                : null
            }

        </div>
    );
};

export default CreateRolePage;