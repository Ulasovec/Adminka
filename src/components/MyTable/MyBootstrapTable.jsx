import React, {useEffect, useState} from 'react';
import {Table, Button} from "react-bootstrap";
import TableBody from "./TableBody";
import PropTypes from "prop-types";


const MyBootstrapTable = ({
                              contentRow,
                              deleteRow,
                              putRow,
                              deleteArrayRow
                          }) => {
    const [select, setSelect] = useState(0)
    const [checkArray, setCheckArray] = useState([])
    const userIdsToDelete = checkArray.filter(item => item.checked === false).map(item => item.id)
    const header = Object.keys((contentRow.length === 0) ? [] : contentRow[0]);
    useEffect(() => setSelect(checkArray.filter((item) => item.checked === false).length), [header])

    return (
        <>
        {(contentRow.length === 0)
            ?
             <h4 style={{fontSize: '1.75em', textAlign: 'center'}}>
                 There is no data for your request
            </h4>
            :
            <div style={{overflow: 'auto'}}>
                <Table striped bordered hover className="table">

                    {(checkArray.find(item => item.checked === false))
                        ? <div style={{display: 'flex'}}>
                            <h4 style={{paddingTop: '4px'}}> {select} entry select</h4>
                            <Button variant="outline-danger" style={{marginLeft: '4px'}} onClick={() => {
                                deleteArrayRow(userIdsToDelete);
                                setCheckArray([])
                            }}>Delete</Button>
                        </div>
                        : null
                    }
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        {header.map((item, index) => <th key={index}>{item}</th>)}
                        <th>OPTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contentRow.map((item) =>
                        <TableBody
                            key={item.id}
                            id={item.id}
                            item={item}
                            deleteRow={deleteRow}
                            checkArray={checkArray}
                            setCheckArray={setCheckArray}
                            putRow={putRow}
                        />
                    )
                    }
                    </tbody>
                </Table>
            </div>

}</> )
};

export default MyBootstrapTable;

MyBootstrapTable.propTypes = {
    /**
     * contentRow (Приходит массив обьектов, предназначеный для рендера в таблице)
     * deleteRow (Функция отправляется к родительскому компоненту, аргументом функция принемает Id обьекта который надо удалить)
     * putRow (Функция отправляется к родительскому компоненту, аргументом функция принемает Id обьекта который надо обновить)
     * deleteArrayRow (Функция отправляется к родительскому компоненту, аргументом функция принемает массив обьектов которые надо удалить)
     */
    contentRow: PropTypes.array,
    deleteRow: PropTypes.func,
    putRow: PropTypes.func,
    deleteArrayRow: PropTypes.func,
}