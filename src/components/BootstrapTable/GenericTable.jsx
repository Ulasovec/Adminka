import React from 'react';
import {Table} from "react-bootstrap";

const GenericTable = ({schema, dataList, markedItem, handleRowClick, handleRowDoubleClick}) => {

    // Допущение - корневая структура является объектом!

    function dereferenceSchema(subSchema, rootSchema) {
        return subSchema['$ref']
            ? subSchema['$ref'].split('/').slice(1).reduce((p, field) => p[field], rootSchema)
            : subSchema
    }

    const rootProperties = dereferenceSchema(schema, schema).properties;
    console.log('rootProperties: ', JSON.stringify(rootProperties));

    return (
        <Table responsive striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                {Object.entries(rootProperties).map(([propKey, propValue], index) => (
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
                    {Object.entries(rootProperties).map(([propKey, propValue], index) => {
                        const subSchema = dereferenceSchema(propValue, schema);
                        return (
                            <td key={index}>{
                                subSchema.type === 'boolean' && rowItem[propKey]
                                    ? '✓'
                                    : subSchema.type === 'object' || subSchema.type === 'array'
                                        ? JSON.stringify(rowItem[propKey])
                                        : rowItem[propKey]
                            }</td>
                        )
                    })}
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default GenericTable;