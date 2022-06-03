import React, {useImperativeHandle, useRef} from 'react';
import BaseTable, {AutoResizer} from "react-base-table";
import 'react-base-table/styles.css';
import {Link} from "react-router-dom";

const GenericBaseTable = ({
                              schema,
                              dataList,
                              markedItem,
                              sortBy,
                              handleLimit,
                              handleSortBy,
                              handleRowClick,
                              handleRowDoubleClick,
                              onScroll
                          }, ref) => {

    // Допущение - корневая структура схемы является объектом (object)! Не примитивный тип и не массив (array)!

    const ROW_HEIGHT = 50;

    const tableRef = useRef(null);
    useImperativeHandle(ref, () => ({
        scrollToTop: (rowNum) => {
            tableRef.current.scrollToTop(rowNum * ROW_HEIGHT);
        }
    }));

    function dereferenceSchema(subSchema, rootSchema) {
        return subSchema['$ref']
            ? subSchema['$ref'].split('/').slice(1).reduce((p, field) => p[field], rootSchema)
            : subSchema
    }

    const rootProperties = dereferenceSchema(schema, schema).properties;

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
                    column.dataKey === 'id'
                        ? <Link to={`./${rowData[column.dataKey]}`}><strong>{rowData[column.dataKey]}</strong></Link>
                        : typeof rowData[column.dataKey] === 'boolean'
                            ? rowData[column.dataKey] ? '✓' : ''
                            : typeof rowData[column.dataKey] === 'object'
                                ? JSON.stringify(rowData[column.dataKey])
                                : rowData[column.dataKey]
                ),
            }
        )
    });

    const rowEventHandlers = {
        onClick: ({rowData, rowIndex, rowKey, event}) => handleRowClick(rowData),
        onDoubleClick: ({rowData, rowIndex, rowKey, event}) => handleRowDoubleClick(rowData),
    }

    return (
        <div style={{height: 400}}>
            <AutoResizer>
                {({width, height}) => (
                    <BaseTable
                        ref={tableRef}
                        width={width}
                        height={height}
                        columns={columns}
                        data={dataList}
                        rowKey={rootProperties.id ? 'id' : 'rowId'}
                        sortBy={sortBy}
                        onColumnSort={sortBy => {
                            tableRef.current.scrollToTop(0);
                            handleSortBy(sortBy);
                        }}
                        rowEventHandlers={rowEventHandlers}
                        onEndReachedThreshold={20}
                        onEndReached={({distanceFromEnd}) => handleLimit(oldLimit => oldLimit + 20)}
                        onScroll={({scrollTop}) => onScroll({scrollTop: Math.floor(scrollTop / ROW_HEIGHT)})}
                        /*estimatedRowHeight={200}
                        rowHeight={50}*/
                    />
                )}
            </AutoResizer>
        </div>
    );
};

export default React.forwardRef(GenericBaseTable);