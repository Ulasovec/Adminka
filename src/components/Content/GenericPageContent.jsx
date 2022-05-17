import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import GenericTable from "../BootstrapTable/GenericTable";
import GenericModalForm from "../BootstrapForm/GenericModalForm";
import {useGenericContext} from "../../store/context/GenericContext";
import GenericBaseTable from "../BootstrapTable/GenericBaseTable";

const GenericPageContent = ({dataArray = [], schema, uiSchema}) => {
    const context = useGenericContext();
    const {queryFindData, handleCreate, handleUpdate, handleDelete, sortBy, setSortBy} = context;

    const [dataList, setDataList] = useState(dataArray);
    const [show, setShow] = useState(false);
    const [markedItem, setMarkedItem] = useState(undefined);
    //const [sortBy, setSortBy] = useState({ key: 'column-0', order: SortOrder.ASC });

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
        if (markedItem) { //update
            context ? handleUpdate(updatedItem) : setDataList(dataList.map(item => item === markedItem ? updatedItem : item));
        } else { //add
            context ? handleCreate(updatedItem) : setDataList([updatedItem, ...dataList]);
        }
        context ? setMarkedItem(queryFindData.find(item => item.id === updatedItem.id)) : setMarkedItem(updatedItem);
        handleClose();
    }

    function handleDeleteButton() {
        context ? handleDelete(markedItem) : setDataList(dataList.filter(item => item !== markedItem));
        handleClose();
        setMarkedItem(undefined);
    }

    return (
        <div>
            <GenericBaseTable
                schema={schema}
                dataList={context ? queryFindData : dataList}
                markedItem={markedItem}
                sortBy={sortBy}
                onColumnSort={setSortBy}
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

            <Button variant="primary" onClick={handlePlusButton}> + </Button>
        </div>
    );
};

export default GenericPageContent;