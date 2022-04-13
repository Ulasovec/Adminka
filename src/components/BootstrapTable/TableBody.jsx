import React, { useEffect,useState} from 'react';
import {Button, Form} from "react-bootstrap";
import useCheckedReducer from "../../store/reducers/CheckedReduser";

import {BsFileText, BsFileX, BsPencil} from "react-icons/bs";


const TableBody = ({id,userName,deleteUsers,setCheckArray,checkArray,putUsers,createUsersRole}) => {
    const [checked, setChecked] = useState(false);
    const {checkId,setCheckId} = useCheckedReducer()
    useEffect(() => setCheckArray([...checkArray.filter(item => item.id !== checkId.id),checkId]),[checked])

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
            <th>User</th>
            <td className='users__options'>
                <BsPencil style={{fontSize: '1.8em'}} className= 'users__options_put' onClick={()=>createUsersRole(id)}/>
                <BsFileText style={{ fontSize: '2em' }} className= 'users__options_put' onClick={()=>putUsers(id)}/>
                <BsFileX style={{ fontSize: '2em' }} className= 'users__options_delete' onClick={()=>deleteUsers(id)}/>
            </td>
        </tr>
        </tbody>

    );
};

export default TableBody;