import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Table} from "react-bootstrap";
import {UserContext} from "../../store/context/UserContext";

const TableBody = ({id, userName, deleteUsers,deleteCheckbox}) => {
    const [checked, setChecked] = useState(false);
    if(checked){
       pushId(id)
    }
    else{
        deleteId(id)
    }

console.log(checked);
    function deleteId(userId){


    }
    function pushId(userId){


    }
    return (

        <tbody>
        <tr className='users'>
            <th> <Form.Check
                inline
                label={`${id}` }
                name="group1"
                checked={checked}
                onChange={() => setChecked(!checked)}
            /></th>
            <td>{userName}</td>
            <td className='users__options'>
                <Button variant="outline-danger" onClick={()=>deleteUsers(id)}>Delete</Button></td>
        </tr>
        </tbody>

    );
};

export default TableBody;