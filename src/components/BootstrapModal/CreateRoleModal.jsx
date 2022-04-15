import React, {useReducer, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";


const CreateRoleModal = ({setModal, putRole, handlePutRole}) => {

    const [show, setShow] = useState(true);
    const [input, setInput] = useReducer((input, action) => ({...input, ...action}), {...putRole})

    function handleClose() {
        setShow(false);
        setModal(false);
    }

    function handleSubmit(e) {
        e.preventDefault()
        /*setRolesArray(rolesArray.map(item => {
            if (item.id === input.id) {
                return input
            }
            return item
        }))*/
        handlePutRole(input)
        setModal(false);
        setShow(false);
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Put Roles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={input.name}
                                onChange={(e) => setInput({name: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                          value={input.about}
                                          onChange={(e) => setInput({about: e.target.value})}
                            />
                        </Form.Group>
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

export default CreateRoleModal;