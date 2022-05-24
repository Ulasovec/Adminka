import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import GenericTable from "../BootstrapTable/GenericTable";
import GenericModalForm from "../BootstrapForm/GenericModalForm";
import {useGenericContext} from "../../store/context/GenericContext";
import GenericBaseTable from "../BootstrapTable/GenericBaseTable";
import {useSortedAndFilteredList} from "../../hooks/SortedFilter/SortFilter";
import {useSearchParams} from "react-router-dom";

const GenericPageContent = ({dataArray = [], schema, uiSchema}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [localSortBy, setLocalSortBy] = useState({ key: 'id', order: 'asc' });
    const [queryString, setQueryString] = useState('');
    const [dataList, setDataList] = useState(dataArray);
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

    const [show, setShow] = useState(false);
    const [markedItem, setMarkedItem] = useState(undefined);

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

    //----- Функции CRUD для локального массива (вариант без API)
    function updateDataArray(updatedItem) {
        setDataList(dataList.map(item => item === markedItem ? updatedItem : item));
    }

    function addToDataArray(itemToAdd) {
        setDataList([itemToAdd, ...dataList]);
    }

    function deleteFromDataArray(itemToDelete) {
        setDataList(dataList.filter(item => item !== itemToDelete));
    }

    return (
        <div>

            <Form.Control type="text" placeholder="Enter search text..."
                          value={searchParams.get("filter") || ""}
                          /*onChange={e => handleQuery(e.target.value)}*/
                          onChange={(event) => {
                              const filter = event.target.value;
                              setSearchParams(filter ? { filter } : {});
                              handleQuery(filter);
                          }}
            />

            <GenericBaseTable
                schema={schema}
                dataList={queryFindData}
                markedItem={markedItem}
                sortBy={sortBy}
                handleSortBy={handleSortBy}
                handleLimit={handleLimit}
                handleRowClick={handleRowClick}
                handleRowDoubleClick={handleRowDoubleClick}
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