import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import useCheckedReducer from "../../store/reducers/CheckedReduser";

import {BsFileText, BsFileX} from "react-icons/bs";
import MyButtonForm from "../../UI components/myButtom/MyButtonForm";


const TableBody = ({id, item, deleteRow, setCheckArray, checkArray, putRow}) => {
    const [checked, setChecked] = useState(false);
    const {checkId, setCheckId} = useCheckedReducer()
    useEffect(() => setCheckArray([...checkArray.filter(item => item.id !== checkId.id), checkId]), [checked])
    const value = Object.values(item).map((item) => item === true && item ? '✓' : item);
    console.log(checkArray)

    return (

        <tr>
            <td>
                <Form.Check
                    inline
                    name="group1"
                    checked={checked}
                    onChange={() => {
                        setChecked(!checked);
                        setCheckId({id: id, checked: checked});
                    }}
                />

            </td>
            {value.map((item, index) => <td key={index}>{item}</td>)}
            <td>
                <MyButtonForm data-title="Update" style={{backgroundColor: '#f2f2f2'}}>
                    <BsFileText style={{fontSize: '2em'}} onClick={() => putRow(id)}/>
                </MyButtonForm>
                <MyButtonForm data-title="Delete" style={{backgroundColor: '#f2f2f2'}}>
                    <BsFileX style={{fontSize: '2em'}} onClick={() => deleteRow(id)}/>
                </MyButtonForm>
            </td>
        </tr>


    );
};

export default TableBody;