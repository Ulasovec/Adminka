import React, {useMemo} from 'react';
import {Table} from "react-bootstrap";
import BaseTable, {AutoResizer, Column} from "react-base-table";
import 'react-base-table/styles.css';

const GenericBaseTable = ({
                              schema,
                              dataList,
                              markedItem,
                              sortBy,
                              handleLimit,
                              handleSortBy,
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
            key: propKey,
            title: propValue.title ?? propKey,
            dataKey: propKey,
            width: 0,
            flexGrow: 1,
            resizable: true,
            sortable: true
        }
    ));

    console.log('Columns: ', JSON.stringify(columns))
    console.log('SortBy', JSON.stringify(sortBy))

    const rowEventHandlers = {
        onClick: ({rowData, rowIndex, rowKey, event}) => handleRowClick(rowData),
        onDoubleClick: ({rowData, rowIndex, rowKey, event}) => handleRowDoubleClick(rowData),
        /*onDoubleClick: action('double click'),
        onContextMenu: action('context menu'),
        onMouseEnter: action('mouse enter'),
        onMouseLeave: action('mouse leave'),*/
    }

    return (

        /*<BaseTable width={700} height={400}
                   columns={columns}
                   data={dataList}
                   sortBy={sortBy}
                   onColumnSort={onColumnSort}
        />*/

        /*<BaseTable width={700} height={400} data={dataList}>
            {columns.map((column, index) => (
                <Column key={index} {...column} />
            ))}
        </BaseTable>*/

        <div style={{height: 400}}>
            <AutoResizer>
                {({width, height}) => (
                    <BaseTable
                        width={width}
                        height={height}
                        columns={columns}
                        data={dataList}
                        sortBy={sortBy}
                        onColumnSort={handleSortBy}
                        rowEventHandlers={rowEventHandlers}
                        onEndReachedThreshold={5}
                        onEndReached={({ distanceFromEnd }) => handleLimit(oldLimit => oldLimit + 10)}
                    />
                )}
            </AutoResizer>
        </div>



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