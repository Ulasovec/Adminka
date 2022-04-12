import React from 'react';
import {Form, Table} from "react-bootstrap";
import  './BootstrapTable.css'
import {BsFileText, BsFileX} from "react-icons/bs";




const BootstrapRolesTable = ({rolesArray,deleteRoles,putRoles }) => {

    return (
        <Table striped bordered hover>

            <thead>
            <tr>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>USERS</th>

            </tr>
            </thead>
            {rolesArray.map(item =>
                <tbody key={item.id}>
                <tr className='users'>
                    <td>{item.name}</td>
                    <th>{item.description}</th>
                    <th>{item.users}</th>
                    <td className='users__options'>
                        <BsFileText style={{ fontSize: '2em' }}
                                    className= 'users__options_put'
                                    onClick={()=>putRoles(item.id)}/>
                        <BsFileX style={{ fontSize: '2em' }}
                                 className= 'users__options_delete'
                                 onClick={()=>deleteRoles(item.id)}
                        />
                    </td>
                </tr>
                </tbody>
            )
            }

        </Table>
    );
};

export default BootstrapRolesTable;