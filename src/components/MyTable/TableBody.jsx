import React, { useEffect,useState} from 'react';
import {Button, Form} from "react-bootstrap";
import useCheckedReducer from "../../store/reducers/CheckedReduser";

import {BsFileText, BsFileX} from "react-icons/bs";


const TableBody = ({id,item,deleteRow,setCheckArray,checkArray,putRow}) => {
    const [checked, setChecked] = useState(false);
    const {checkId,setCheckId} = useCheckedReducer()
    useEffect(() => setCheckArray([...checkArray.filter(item => item.id !== checkId.id),checkId]),[checked])
    const value = Object.values(item).map((item) =>  item === true && item ? '✓' : item);
    console.log(checkArray)

    return (
        <tbody >
        <tr>
                <td>
                    <Form.Check
                    inline
                    name="group1"
                    checked={checked}
                    onChange={() => {setChecked(!checked);
                        setCheckId({id:id,checked:checked});
                    }}
                />

                </td>
            {value.map((item) =><td>{item}</td> )}

            <td>  {/*<div className='users'>*/}
                <BsFileText style={{ fontSize: '2em' }} className= 'users__options_put' onClick={()=>putRow(id)}/>
                <BsFileX style={{ fontSize: '2em' }} className= 'users__options_delete' onClick={()=>deleteRow(id)}/>
                {/*</div>*/}</td>
            </tr>
        </tbody>

    );
};

export default TableBody;