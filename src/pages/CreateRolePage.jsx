import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import CreateRolesForm from "../components/BootstrapForm/CreateRolesForm";
import BootstrapRolesTable from "../components/BootstrapTable/BootstrapRolesTable";
import useRolesNameReducer from "../store/reducers/CreateRoleReducer";

const CreateRolePage = () => {
    const {roles, setRolesName} = useRolesNameReducer();
    const [rolesArray, setRolesArray] = useState([]);

    function deleteRoles(id){
        setRolesArray(rolesArray.filter(item => item.id !== id));
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
                />
            </Container>

    );
};

export default CreateRolePage;