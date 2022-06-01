import React, {useEffect, useRef, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import GenericTable from "../BootstrapTable/GenericTable";
import GenericModalForm from "../BootstrapForm/GenericModalForm";
import {useGenericContext} from "../../store/context/GenericContext";
import GenericBaseTable from "../BootstrapTable/GenericBaseTable";
import {useSortedAndFilteredList} from "../../hooks/SortedFilter/SortFilter";
import {useSearchParams} from "react-router-dom";

const GenericPageContent = ({dataArray = [], setDataArray = f => f, schema, uiSchema}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsObj = Object.fromEntries([...searchParams]);
    const {filter, sortby, order, scrollto} = searchParamsObj;

    const [initScrollToRow, setInitScrollToRow] = useState(undefined);

    const tableRef = useRef(null);
    const isTableRefAvailable = (tableRef.current !== undefined);

    const [localSortBy, setLocalSortBy] = useState({key: 'id', order: 'asc'});
    const [queryString, setQueryString] = useState('');

    //const [dataList, setDataList] = useState(dataArray);
    const dataList = dataArray;
    const setDataList = setDataArray;

    const sortedAndFilteredList = useSortedAndFilteredList(dataList, localSortBy.key, queryString, localSortBy.order);

    const context = useGenericContext();
    const {
        queryFindData = sortedAndFilteredList,
        handleCreate = addToDataArray,
        handleUpdate = updateDataArray,
        handleDelete = deleteFromDataArray,
        sortBy = localSortBy,
        handleSortBy = setLocalSortBy,
        handleLimit = f => f,
        handleQuery = setQueryString
    } = context ?? {};

    useEffect(() => {
        handleQuery(filter ?? '');
        handleSortBy({key: sortby ? sortby : 'id', order: order ? order : 'asc'});
    }, [filter, sortby, order]);

    useEffect(() => {
        if (scrollto) {
            setInitScrollToRow(scrollto);
            handleLimit(scrollto + 20);
        }
    }, [])

    useEffect(() => {
        //console.log("init, data.length, current : ", initScrollToRow, queryFindData.length, tableRef.current);
        if (initScrollToRow && queryFindData.length > initScrollToRow && tableRef.current) {
            tableRef.current.scrollToTop(initScrollToRow);
            //console.log("Scroll to : ", initScrollToRow);
            setInitScrollToRow(undefined);
        }
    }, [initScrollToRow && queryFindData.length > initScrollToRow && isTableRefAvailable]);

    const [show, setShow] = useState(false);
    const [markedItem, setMarkedItem] = useState(undefined);

    //console.log('Search Params: ', JSON.stringify(searchParamsObj));

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handlePlusButton() {
        setMarkedItem(undefined);
        handleShow();
    }

    function handleRowClick(item) {
        setMarkedItem(item);
    }

    function handleRowDoubleClick(item) {
        setMarkedItem(item);
        handleShow();
    }

    function handleSubmit(updatedItem) {
        markedItem ? handleUpdate(updatedItem) : handleCreate(updatedItem);
        // Далее строка для пометки измененной или добавленной строки. Не обязательна для логики.
        context ? setMarkedItem(queryFindData.find(item => item.id === updatedItem.id)) : setMarkedItem(updatedItem);
        handleClose();
    }

    function handleDeleteButton() {
        handleDelete(markedItem);
        handleClose();
        setMarkedItem(undefined);
    }

    function interceptorHandleSortBy(sortBy) {
        setSearchParams({...searchParamsObj, sortby: sortBy.key, order: sortBy.order});
        //handleSortBy(sortBy); //далее useEffect срабатывает
    }

    function handleScroll({scrollTop}) {
        //console.log('Scroll Top: ', scrollTop);
        setSearchParams({...searchParamsObj, scrollto: scrollTop});
    }

    //----- Функции CRUD для локального массива (вариант без API)
    function updateDataArray(updatedItem) {
        const modifiedDataList = dataList.map(item => item === markedItem ? updatedItem : item);
        setDataList(modifiedDataList);
        //if (setDataArray) setDataArray(modifiedDataList);
    }

    function addToDataArray(itemToAdd) {
        const modifiedDataList = [...dataList, itemToAdd];
        setDataList(modifiedDataList);
        //if (setDataArray) setDataArray(modifiedDataList);
    }

    function deleteFromDataArray(itemToDelete) {
        const modifiedDataList = dataList.filter(item => item !== itemToDelete);
        setDataList(modifiedDataList);
        //if (setDataArray) setDataArray(modifiedDataList);
    }

    return (
        <div>

            <Form.Control type="text" placeholder="Enter search text..."
                          value={searchParams.get("filter") || ""}
                /*onChange={e => handleQuery(e.target.value)}*/
                          onChange={(event) => {
                              const filter = event.target.value;
                              const {filter: oldFilter, ...otherOldParams} = searchParamsObj;
                              if (filter) setSearchParams({...otherOldParams, filter});
                              else setSearchParams(otherOldParams);
                              //handleQuery(filter); //далее useEffect срабатывает
                          }}
            />

            <GenericBaseTable
                ref={tableRef}
                schema={schema}
                dataList={queryFindData}
                markedItem={markedItem}
                sortBy={sortBy}
                handleSortBy={interceptorHandleSortBy}
                handleLimit={handleLimit}
                handleRowClick={handleRowClick}
                handleRowDoubleClick={handleRowDoubleClick}
                onScroll={handleScroll}
            />

            {/*<GenericTable
                schema={schema}
                dataList={context ? queryFindData : dataList}
                markedItem={markedItem}
                handleRowClick={handleRowClick}
                handleRowDoubleClick={handleRowDoubleClick}
            />*/}

            <GenericModalForm
                show={show}
                schema={schema}
                uiSchema={uiSchema}
                formData={markedItem}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                handleDelete={handleDeleteButton}
            />
            <div>
                <Button variant="primary" onClick={handlePlusButton}> + </Button>
            </div>
        </div>
    );
};

export default GenericPageContent;