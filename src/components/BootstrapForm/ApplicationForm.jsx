import React, {useReducer, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import MyButtonForm from "../../UI components/MyButtonForm";
import {BsPlusSquare} from "react-icons/bs";

const ApplicationForm = ({handleSubmit}) => {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [isActive, setIsActive] = useState(true);

    function submitHandler(e) {
        e.preventDefault();
        handleSubmit({name, about, is_active: isActive});
        setName('');
        setAbout('');
        setIsActive(true);
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <div style={{display:'flex',justifyContent: 'flex-end'}}>
                    <MyButtonForm ><BsPlusSquare style={{fontSize: '1.8em' }}/></MyButtonForm>
                </div>
                <Form.Label>Application Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter application name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Form.Text className="text-muted">
                    Arbitrary but unique name.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAbout">
                <Form.Label>Application Description</Form.Label>
                <Form.Control
                    as="textarea" rows={3}
                    placeholder="Enter application description"
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIsActive">
                <Form.Check
                    type="checkbox"
                    label="Is active?"
                    checked={isActive}
                    onChange={() => setIsActive(isActive => !isActive)}
                />
            </Form.Group>
            {/*<Button variant="primary" type="submit" disabled={name === '' || about === ''}>*/}
            {/*    Submit*/}
            {/*</Button>*/}
        </Form>
    );
};

export default ApplicationForm;