import React, {useState} from 'react';
import { Table,Form } from "react-bootstrap";
import  './BootstrapTable.css'
import TableBody from "./TableBody";



const BootstrapUsersTable = ({createUser,deleteUsers,checkArray,setCheckArray,putUsers}) => {

    return (
            <Table striped bordered hover>

                <thead>
                <tr>

                    <th> <Form.Check
                        inline
                        label="id"
                        name="group1"
                        disabled
                    /></th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Options</th>

                </tr>
                </thead>
                    {createUser.map((item) =>
                            <React.Fragment key={item.id}>
                            <TableBody

                                       id={item.id}
                                       userName={item.name}
                                       deleteUsers={deleteUsers}
                                       checkArray = {checkArray}
                                       setCheckArray = {setCheckArray}
                                       putUsers = {putUsers}
                            />
                            </React.Fragment>
                     )
                    }




            </Table>
    );
};

export default BootstrapUsersTable;