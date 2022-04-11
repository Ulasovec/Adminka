import React, {useState} from 'react';
import { Table,Form } from "react-bootstrap";
import  './BootstrapTable.css'
import TableBody from "./TableBody";



const BootstrapTable = ({createUser,usersId,deleteUsers,checkArray,setCheckArray}) => {

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
                    {(usersId)
                        ? createUser.map((item) =>
                            <React.Fragment key={item.id}>
                            <TableBody

                                       id={item.id}
                                       userName={item.userName}
                                       deleteUsers={deleteUsers}
                                       checkArray = {checkArray}
                                       setCheckArray = {setCheckArray}

                            />
                            </React.Fragment>
                     )
                        : null}




            </Table>
    );
};

export default BootstrapTable;