import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Button, Form, Table} from "react-bootstrap";
import useCheckedReducer from "../../store/reducers/CheckedReduser";

const TableBody = ({id, userName, deleteUsers,setCheckArray,checkArray}) => {
    const [checked, setChecked] = useState(false);
    const {checkId,setCheckId} = useCheckedReducer()
    useEffect(() => setCheckArray([...checkArray.filter(item => item.id !== checkId.id),checkId]),[checked])
    // if(checkArray.length === 0){
    //     setChecked(false)
    // }

    console.log(checkId)
    console.log(checkArray)
    return (

        <tbody>
        <tr className='users'>
                <th> <Form.Check
                    inline
                    label={`${id}` }
                    name="group1"
                    checked={checked}
                    onChange={() => {setChecked(!checked);
                        setCheckId({id:id,checked:checked});
                    }}
                /></th>

            <td>{userName}</td>
            <td className='users__options'>
                <Button variant="outline-danger" onClick={()=>deleteUsers(id)}>Delete</Button></td>
        </tr>
        </tbody>

    );
};

export default TableBody;