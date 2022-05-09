import React, {useState} from 'react';
import Form from '@rjsf/bootstrap-4';
import {Button, Container, Modal, Table} from "react-bootstrap";
import GenericForm from "../components/BootstrapForm/GenericForm";

const schema = {
    title: "Todo item",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        days: {type: "number", title: "How many days?", default: 1, exclusiveMinimum: 0, maximum: 10},
        finish: {type: "string", format: "date-time", title: "Finish date", default: "1970-01-01T00:00:00.000Z"}
    }
};

const uiSchema = {
    done: {"ui:widget": "radio"},
    days: {"ui:widget": "range"}
};

const formData = {
    title: "First task",
    done: true,
    days: 5,
    finish: "2022-05-07T18:30:00.000Z"
};

const dataArray = [
    {title: "First task", done: true, days: 5, finish: "2022-05-07T18:30:00.000Z"},
    {title: "Second task", done: false, days: 4, finish: "2022-05-08T8:45:00.000Z"},
    {title: "Third task", done: true, days: 7, finish: "2022-05-07T18:30:00.000Z"},
    {title: "Forth task", done: true, days: 1, finish: "2022-05-07T18:30:00.000Z"},
    {title: "Fifth task", done: true, days: 2, finish: "2022-05-07T18:30:00.000Z"},
]

const log = (type) => console.log.bind(console, type);

const GenericPage = () => {
    const [dataList, setDataList] = useState(dataArray);
    const [show, setShow] = useState(false);
    const [clickedItem, setClickedItem] = useState(undefined);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handlePlusButton() {
        setClickedItem(undefined);
        handleShow();
    }

    function handleRowClick(item) {
        setClickedItem(item);
    }

    function handleRowDoubleClick(item) {
        setClickedItem(item);
        handleShow();
    }

    function handleSubmit(updatedItem) {
        if (clickedItem) { //update
            setDataList(dataList.map(item => item === clickedItem ? updatedItem : item));
            setClickedItem(updatedItem);
        } else { //add
            setDataList([updatedItem, ...dataList]);
        }
        handleClose();
    }

    function handleDelete() {
        setDataList(dataList.filter(item => item !== clickedItem));
        setClickedItem(undefined);
        handleClose();
    }

    return (
        <div>
            <Container>

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
                            style={item === clickedItem ? {backgroundColor: 'lightBlue'} : null}
                        >
                            <td>{index + 1}</td>
                            {Object.values(item).map((item, index) => (
                                <td key={index}>{typeof item === 'boolean' && item ? '✓' : item}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <p>Double click on any line...</p>

                <GenericForm
                    show={show}
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={clickedItem}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                />

                {/*<Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{clickedItem ? 'Edit data' : 'Add data'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form schema={schema}
                              uiSchema={uiSchema}
                              formData={clickedItem}
                              onChange={log("changed")}
                              onSubmit={e => handleSubmit(e.formData)}
                              onError={log("errors")}
                        >
                            {clickedItem
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
        </div>
    );
};

export default GenericPage;