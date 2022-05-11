/**
 * Демонстрация CRUD массива объектов с произвольными полями
 * с использованием описания объекта списка в виде json-schema.
 * !!! Предполагается, что поля объекта не содержат другие объекты и массивы.
 */
import React, {useState} from 'react';
import Form from '@rjsf/bootstrap-4';
import {Button, Container, Modal, Table} from "react-bootstrap";
import GenericModalForm from "../components/BootstrapForm/GenericModalForm";
import GenericTable from "../components/BootstrapTable/GenericTable";
import {Toaster} from "react-hot-toast";

const schema = {
    title: "Todo item",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        days: {type: "number", title: "How many days?", default: 1, exclusiveMinimum: 0, maximum: 10},
        finish: {type: "string", format: "date-time", title: "Finish date", default: "1970-01-01T00:00:00.000Z"},
        dimensions: {
            type: "object",
            title: "Размеры",
            properties: {
                length: {type: "number", title: "Длина"},
                width: {type: "number", title: "Ширина"},
                height: {type: "number", title: "Высота"}
            },
            required: [ "length", "width", "height" ]
        }
    }
};

const uiSchema = {
    done: {"ui:widget": "radio"},
    days: {"ui:widget": "range"}
};

const dataArray = [
    {title: "First task", done: true, days: 5, finish: "2022-05-07T18:30:00.000Z", dimensions: {length: 1, width: 2, height: 3}},
    {title: "Second task", done: false, days: 4, finish: "2022-05-08T8:45:00.000Z", dimensions: {length: 11, width: 22, height: 33}},
    {title: "Third task", done: true, days: 7, finish: "2022-05-07T18:30:00.000Z", dimensions: {length: 5, width: 6, height: 7}},
    {title: "Forth task", done: true, days: 1, finish: "2022-05-07T18:30:00.000Z", dimensions: {length: 101, width: 20, height: 30}},
    {title: "Fifth task", done: true, days: 2, finish: "2022-05-07T18:30:00.000Z", dimensions: {length: 1.1, width: 2.5, height: 3.2}},
]

const log = (type) => console.log.bind(console, type);

const GenericPage = () => {
    const [dataList, setDataList] = useState(dataArray);
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
        if (markedItem) { //update
            setDataList(dataList.map(item => item === markedItem ? updatedItem : item));
        } else { //add
            setDataList([updatedItem, ...dataList]);
        }
        setMarkedItem(updatedItem);
        handleClose();
    }

    function handleDelete() {
        setDataList(dataList.filter(item => item !== markedItem));
        setMarkedItem(undefined);
        handleClose();
    }

    return (
        <div>
            <Container>

                <GenericTable
                    schema={schema}
                    dataList={dataList}
                    markedItem={markedItem}
                    handleRowClick={handleRowClick}
                    handleRowDoubleClick={handleRowDoubleClick}
                />
                {/*До декомпозиции таблицы*/}
                {/*<Table responsive striped bordered hover>
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
                </Table>*/}

                <GenericModalForm
                    show={show}
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={markedItem}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                />
                {/*До декомпозиции модальной формы*/}
                {/*<Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{markedItem ? 'Edit data' : 'Add data'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form schema={schema}
                              uiSchema={uiSchema}
                              formData={markedItem}
                              onChange={log("changed")}
                              onSubmit={e => handleSubmit(e.formData)}
                              onError={log("errors")}
                        >
                            {markedItem
                                ? <div>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Delete item
                                    </Button>
                                    <Button type="submit" variant="primary" className="m-3">
                                        Save Changes
                                    </Button>
                                </div>
                                : <Button type="submit" variant="primary" className="m-3">
                                    Add
                                </Button>
                            }
                        </Form>
                    </Modal.Body>
                </Modal>*/}

                <Button variant="primary" onClick={handlePlusButton}> + </Button>

            </Container>
            <Toaster/>
        </div>
    );
};

export default GenericPage;