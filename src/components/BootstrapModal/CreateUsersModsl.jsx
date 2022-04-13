import React, {useReducer, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";


const CreateUsersModal = ({setModal,putUser, createUser, setCreateUser}) => {

    const [show, setShow] = useState(true);
    const [input, setInput] = useReducer((input,action) => ({...input,...action}),{...putUser})
    function handleClose() {
        setShow(false);
        setModal(false);
    }
    function handleSubmit(e) {
        e.preventDefault()
        setCreateUser(createUser.map(item =>{
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
                    <Modal.Title>Put User name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={input.userName}
                                onChange={(e) => setInput({userName: e.target.value})}
                            />
                        </Form.Group>
                        <div style={{  display:'flex',
                            justifyContent: 'flex-end'}}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' >
                            Save
                        </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateUsersModal;