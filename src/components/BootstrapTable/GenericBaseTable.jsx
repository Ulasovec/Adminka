import React, {useMemo, useRef} from 'react';
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

    const tableRef = useRef(null);

    function dereferenceSchema(subSchema, rootSchema) {
        return subSchema['$ref']
            ? subSchema['$ref'].split('/').slice(1).reduce((p, field) => p[field], rootSchema)
            : subSchema
    }

    const rootProperties = dereferenceSchema(schema, schema).properties;
    console.log('rootProperties: ', JSON.stringify(rootProperties));

    const columns = Object.entries(rootProperties).map(([propKey, propValue], index) => {
        const subSchema = dereferenceSchema(propValue, schema);
        return (
            {
                key: propKey,
                title: subSchema.title ?? propKey,
                dataKey: propKey,
                schemaType: subSchema.type,
                schemaFormat: subSchema.format,
                width: 0,
                minWidth: 100,
                flexGrow: 1,
                resizable: true,
                sortable: true,
                dataGetter: ({column, rowData}) => (
                    typeof rowData[column.dataKey] === 'boolean'
                        ? rowData[column.dataKey] ? '✓' : ''
                        : typeof rowData[column.dataKey] === 'object'
                            ? JSON.stringify(rowData[column.dataKey])
                            : rowData[column.dataKey]
                ),
                /*style: {whiteSpace: 'normal'}*/
            }
        )
    });

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
                        ref={tableRef}
                        width={width}
                        height={height}
                        columns={columns}
                        data={dataList}
                        sortBy={sortBy}
                        onColumnSort={sortBy => {
                            tableRef.current.scrollToTop(0);
                            handleSortBy(sortBy);
                        }}
                        rowEventHandlers={rowEventHandlers}
                        onEndReachedThreshold={20}
                        onEndReached={({distanceFromEnd}) => handleLimit(oldLimit => oldLimit + 20)}
                        /*estimatedRowHeight={200}
                        rowHeight={50}*/
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