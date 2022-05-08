import React, {useState} from 'react';
import Form from '@rjsf/bootstrap-4';
import {Button, Container, Modal, Table} from "react-bootstrap";

const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        days: {type: "number", title: "How many days?", default: 1, exclusiveMinimum: 0, maximum: 10},
        finish: {type: "string", format: "date-time", title: "Finish date"}
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

const AboutPage = () => {
    const [show, setShow] = useState(false);
    const [clickedItem, setClickedItem] = useState(undefined);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleDoubleClick(item) {
        setClickedItem(item);
        handleShow();
        console.log('Line: ', item);
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
                    {dataArray.map((item, index) => (
                        <tr key={index} onDoubleClick={() => handleDoubleClick(item)}>
                            <td>{index + 1}</td>
                            {Object.values(item).map((item, index) => (
                                <td key={index}>{typeof item === 'boolean' && item ? '✓' : item}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <p>Double click on any line...</p>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form schema={schema}
                              uiSchema={uiSchema}
                              formData={clickedItem}
                              onChange={log("changed")}
                              onSubmit={e => console.log("submitted. formData: ", e.formData)}
                              onError={log("errors")}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </div>
    );
};

export default AboutPage;