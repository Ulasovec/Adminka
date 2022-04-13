import React, {useState} from 'react';
import { Table,Form } from "react-bootstrap";
import  './BootstrapTable.css'
import TableBody from "./TableBody";



const BootstrapUsersTable = ({createUser,usersId,deleteUsers,checkArray,setCheckArray,putUsers}) => {

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
                    <th>UserName</th>
                    <th>Role</th>
                    <th>Options</th>

                </tr>
                </thead>
                    {(usersId > 0)
                        ? createUser.map((item) =>
                            <React.Fragment key={item.id}>
                            <TableBody

                                       id={item.id}
                                       userName={item.userName}
                                       deleteUsers={deleteUsers}
                                       checkArray = {checkArray}
                                       setCheckArray = {setCheckArray}
                                       putUsers = {putUsers}
                            />
                            </React.Fragment>
                     )
                        : null}




            </Table>
    );
};

export default BootstrapUsersTable;