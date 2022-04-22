import React, {useEffect, useState} from 'react';
import {Table, Button} from "react-bootstrap";
import '../BootstrapTable/BootstrapTable.css'
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
        <div style={{overflow: 'auto'}}>
        <Table striped bordered hover class="table">

            {(checkArray.find(item => item.checked === false))
                ? <div style={{display: 'flex'}}>
                    <h3 style={{paddingTop: '4px'}}> {select} entry select</h3>
                    <Button variant="outline-danger" style={{marginLeft: '4px'}} onClick={() => {
                        deleteArrayRow(userIdsToDelete);
                        setCheckArray([])
                    }}>Delete</Button>
                </div>
                : null
            }
            <thead class="table-dark">
            <tr>
                <th>OPTIONS</th>
                {header.map((item) => <th>{item}</th>)}
            </tr>
            </thead>
            {contentRow.map((item) =>
                <React.Fragment key={item.id}>
                    <TableBody
                        id={item.id}
                        item={item}
                        deleteRow={deleteRow}
                        checkArray={checkArray}
                        setCheckArray={setCheckArray}
                        putRow={putRow}
                    />
                </React.Fragment>
            )
            }


        </Table>
        </div>
    );
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