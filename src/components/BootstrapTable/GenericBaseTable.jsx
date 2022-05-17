import React from 'react';
import {Table} from "react-bootstrap";
import BaseTable, {AutoResizer, Column} from "react-base-table";
import 'react-base-table/styles.css';

const GenericBaseTable = ({
                              schema,
                              dataList,
                              markedItem,
                              sortBy,
                              onColumnSort,
                              handleRowClick,
                              handleRowDoubleClick
                          }) => {

    // Допущение - корневая структура является объектом!

    function dereferenceSchema(subSchema, rootSchema) {
        return subSchema['$ref']
            ? subSchema['$ref'].split('/').slice(1).reduce((p, field) => p[field], rootSchema)
            : subSchema
    }

    const rootProperties = dereferenceSchema(schema, schema).properties;
    console.log('rootProperties: ', JSON.stringify(rootProperties));

    const columns = Object.entries(rootProperties).map(([propKey, propValue], index) => (
        {
           /* key: index,*/
            title: propValue.title ?? propKey,
            dataKey: propKey,
            width: 100,
            /*flexGrow: 1,
            resizable: true,
            sortable: true*/
        }
    ));

    console.log(JSON.stringify(columns))

    return (

        <BaseTable width={700} height={400} data={dataList}>
            {columns.map((column, index) => (
                <Column key={index} {...column} />
            ))}
        </BaseTable>
        /*<AutoResizer>
            {({width, height}) => (
                <BaseTable
                    width={width}
                    height={height}
                    columns={columns}
                    data={dataList}
                    sortBy={sortBy}
                    onColumnSort={onColumnSort}
                />
            )}
        </AutoResizer>*/


    /*<Table responsive striped bordered hover>
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
    </Table>*/
)
    ;
};

export default GenericBaseTable;