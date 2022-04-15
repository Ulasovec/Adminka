import React from 'react';
import { Table,Form } from "react-bootstrap";
import  './BootstrapTable.css'
import TableBody from "./TableBody";



const BootstrapUsersTable = ({createUser,deleteUsers,checkArray,setCheckArray,putUsers,createUsersRole}) => {

    return (
            <Table striped bordered hover class="table" >

                <thead class="table-dark">
                <tr>

                    <th> <Form.Check
                        inline
                        label="id"
                        name="group1"
                        disabled
                    /></th>
                    <th>UserName</th>
                    <th>is_active</th>
                    <th>Options</th>

                </tr>
                </thead>
                    {createUser.map((item) =>
                            <React.Fragment key={item.id}>
                            <TableBody

                                       id={item.id}
                                       userName={item.name}
                                       active={item.is_active}
                                       deleteUsers={deleteUsers}
                                       checkArray = {checkArray}
                                       setCheckArray = {setCheckArray}
                                       putUsers = {putUsers}
                                       createUsersRole = {createUsersRole}
                            />
                            </React.Fragment>
                     )
                    }




            </Table>
    );
};

export default BootstrapUsersTable;