import React from 'react';
import {Table,Form} from "react-bootstrap";
import {useQueryAclRoleFind} from "../../hooks/fetch/useAclRole";

const TableSelectRole = () => {
    const roleArray = useQueryAclRoleFind();
    console.log(roleArray);
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th># Select</th>
                <th>Role</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {roleArray.data?.data?.roles.map((item) =>
                <tr>
                <td>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                    /> </td>
                <td>{item.name}</td>
                <td>{item.about}</td>
                </tr>)}

            </tbody>
        </Table>
    );
};

export default TableSelectRole;