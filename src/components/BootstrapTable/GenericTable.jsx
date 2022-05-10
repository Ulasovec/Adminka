import React from 'react';
import {Table} from "react-bootstrap";

const GenericTable = ({schema, dataList, markedItem, handleRowClick, handleRowDoubleClick}) => {
    return (
        <Table responsive striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                {Object.values(schema.properties).map((item, index) => (
                    <th key={index}>{item.title}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {dataList.map((item, index) => (
                <tr key={index}
                    onDoubleClick={() => handleRowDoubleClick(item)}
                    onClick={() => handleRowClick(item)}
                    style={item === markedItem ? {backgroundColor: 'lightBlue'} : null}
                >
                    <td>{index + 1}</td>
                    {Object.values(item).map((item, index) => (
                        <td key={index}>{typeof item === 'boolean' && item ? '✓' : item}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default GenericTable;