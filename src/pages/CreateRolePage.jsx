import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import CreateRolesForm from "../components/BootstrapForm/CreateRolesForm";
import BootstrapRolesTable from "../components/BootstrapTable/BootstrapRolesTable";
import useRolesNameReducer from "../store/reducers/CreateRoleReducer";
import CreateRoleModal from "../components/BootstrapModal/CreateRoleModal";

const CreateRolePage = () => {
    const {roles, setRolesName} = useRolesNameReducer();
    const [rolesArray, setRolesArray] = useState([]);
    const [modal, setModal] = useState(false);
    const [putRole,setPutRole] = useState({});
    console.log(rolesArray);
    function deleteRoles(id){
        setRolesArray(rolesArray.filter(item => item.id !== id));

    }
    function putRoles(id){
        setModal(true);
        setPutRole(rolesArray.filter(item => item.id === id)[0])

    }
    return (

            <Container>
                    <h1 style={{fontSize: '1.75em',textAlign:'center'}}>||| Create Roles |||</h1>
                <CreateRolesForm roles = {roles}
                                 setRolesName = {setRolesName}
                                 rolesArray = {rolesArray}
                                 setRolesArray = {setRolesArray}
                />
                <BootstrapRolesTable rolesArray = {rolesArray}
                                     setRolesArray = {setRolesArray}
                                     deleteRoles = {deleteRoles}
                                     putRoles = {putRoles}
                />
                {(modal)
                    ?<CreateRoleModal modal = {modal}
                                      setModal = {setModal}
                                      putRole = {putRole}
                                      rolesArray = {rolesArray}
                                      setRolesArray = {setRolesArray}
                    />
                    :null
                }
            </Container>


    );
};

export default CreateRolePage;