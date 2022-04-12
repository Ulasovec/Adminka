import React, {useReducer, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";


const CreateRoleModal = ({modal, setModal,putRole, rolesArray, setRolesArray}) => {

    const [show, setShow] = useState(true);
    const [input, setInput] = useReducer((input,action) => ({...input,...action}),{...putRole})
    function handleClose() {
        setShow(false);
        setModal(false);
    }
    function handleSubmit(e) {
        e.preventDefault()
        setRolesArray(rolesArray.map(item =>{
        if(item.id ===input.id)
        {return input}
            return item}))
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
                                          value={input.description}
                                          onChange={(e) => setInput({description: e.target.value})}
                            />
                        </Form.Group>



                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' >
                        Save
                    </Button>

                </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateRoleModal;