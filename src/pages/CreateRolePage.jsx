import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import CreateRolesForm from "../components/BootstrapForm/CreateRolesForm";
import BootstrapRolesTable from "../components/BootstrapTable/BootstrapRolesTable";
import useRolesNameReducer from "../store/reducers/CreateRoleReducer";
import CreateRoleModal from "../components/BootstrapModal/CreateRoleModal";
import {
    useMutationAclRoleCreate,
    useMutationAclRoleDelete,
    useMutationAclRoleUpdate,
    useQueryAclRoleFind
} from "../hooks/fetch/useAclRole";

const CreateRolePage = () => {
    const {roles, setRolesName} = useRolesNameReducer();
    //const [rolesArray, setRolesArray] = useState([]);
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
        <Container>
            <h1 style={{fontSize: '1.75em', textAlign: 'center'}}>||| Create Roles |||</h1>
            <CreateRolesForm roles={roles}
                             setRolesName={setRolesName}
                             handlerCreate={createRoles}
            />
            <BootstrapRolesTable rolesArray={rolesArray}
                                 deleteRoles={deleteRoles}
                                 putRoles={putRoles}
            />
            {(modal)
                ? <CreateRoleModal
                    setModal={setModal}
                    putRole={putRole}
                    handlePutRole={updatePutRole}
                />
                : null
            }
        </Container>
    );
};

export default CreateRolePage;