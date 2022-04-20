import React, {useReducer, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";



const MyPutModal = ({setModal, putForm, handlePutForm}) => {
    const key = Object.keys(putForm);
    const [keys,setKeys] = useState([...key]) ;
    const [show, setShow] = useState(true);
    const [input, setInput] = useReducer((input, action) => ({...input, ...action}), {...putForm})
    console.log(input)
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
                    <Modal.Title>Put User name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        {keys.map((item) =>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                            <Form.Label>{item}</Form.Label>

                            <Form.Control
                                type="text"
                                autoFocus
                                value={input[item]}
                                onChange={(e) => setInput({[item]: e.target.value})}
                            />

                        </Form.Group>
                        )}
                        <div style={{  display:'flex',
                            justifyContent: 'flex-end'}}>
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

    setModal:PropTypes.func,
    putForm:PropTypes.object,
    handlePutForm:PropTypes.func,
}