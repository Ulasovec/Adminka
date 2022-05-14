import React from 'react';
import {Table} from "react-bootstrap";

const GenericTable = ({schema, dataList, markedItem, handleRowClick, handleRowDoubleClick}) => {
    return (
        <div style={{height:'440px',overflow:'scroll',border:'2px solid gray'}}>
        <Table responsive striped bordered hover  >
            <thead >
            <tr>
                <th>#</th>
                {Object.entries(schema.properties).map(([propKey, propValue], index) => (
                    <th key={index}>{propValue.title ?? propKey}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {dataList.map((rowItem, index) => (
                <tr key={index}
                    onDoubleClick={() => handleRowDoubleClick(rowItem)}
                    onClick={() => handleRowClick(rowItem)}
                    style={rowItem === markedItem ? {backgroundColor: 'lightBlue'} : null}
                >
                    <td>{index + 1}</td>
                    {Object.entries(schema.properties).map(([propKey, propValue], index) => (
                        <td key={index}>{
                            propValue.type === 'boolean' && rowItem[propKey]
                                ? '✓'
                                : propValue.type === 'object' || propValue.type === 'array'
                                    ? JSON.stringify(rowItem[propKey])
                                    : rowItem[propKey]
                        }</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
        </div>
    );
};

export default GenericTable;