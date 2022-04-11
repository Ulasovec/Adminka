import React from 'react';
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
                    <th>Options</th>

                </tr>
                </thead>
                {(usersId)
                ? createUser.map((item,index) =>
                            <TableBody key={index}
                                       id={item.id}
                                       userName={item.userName}
                                       deleteUsers={deleteUsers}
                                       checkArray = {checkArray}
                                       setCheckArray = {setCheckArray}

                            />)
                    : null}


            </Table>
    );
};

export default BootstrapTable;