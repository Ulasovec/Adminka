import React, {useReducer, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";


const MyPutModal = ({setModal, putForm, handlePutForm}) => {
    const key = Object.keys(putForm);
    const [keys, setKeys] = useState([...key]);
    const [show, setShow] = useState(true);
    const [input, setInput] = useReducer((input, action) => ({...input, ...action}), {...putForm})

    function handleClose() {
        setShow(false);
        setModal(false);
    }

    function handleSubmit(e) {
        e.preventDefault()
        handlePutForm(input);
        setModal(false);
        setShow(false);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Updated list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {Object.entries(putForm).map(([fieldName, fieldValue]) =>
                            <Form.Group key={fieldName} className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>{fieldName}</Form.Label>
                                {typeof fieldValue === 'boolean'
                                    ? <Form.Check
                                        type="checkbox"
                                        label="Checked?"
                                        checked={input[fieldName]}
                                        onChange={() => setInput({[fieldName]: !fieldValue})}
                                    />
                                    : null
                                }
                                {typeof fieldValue === 'string'
                                    ? <Form.Control
                                        type="text"
                                        autoFocus
                                        value={input[fieldName]}
                                        onChange={(e) => setInput({[fieldName]: e.target.value})}
                                    />
                                    : null
                                }
                                {fieldName.includes('_ts')
                                    ? <Form.Control
                                        type="datetime-local"
                                        value={new Date(input[fieldName] * 1000).toISOString().slice(0,16)}
                                        onChange={(e) =>
                                            setInput({[fieldName]: e.target.value === '' ? 0 : Math.floor(Date.parse(e.target.value)/1000)})
                                        }
                                    />
                                    : null
                                }

                            </Form.Group>
                        )}
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit'>
                                Save
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MyPutModal;

MyPutModal.propTypes = {
    /**
     * setModal (Функция состояния на визуализацию окна, принемает буллиан значение)
     * putForm (Обьект который приходит для рендера)
     * handlePutForm(Функция отправляется к родительскому компоненту, аргументом функция принемает обновлённый обьект)
     */
    setModal: PropTypes.func,
    putForm: PropTypes.object,
    handlePutForm: PropTypes.func,
}