import React, {useReducer} from 'react';
import {Button, Form} from "react-bootstrap";
import useLogin from "../../hooks/fetch/Users";


const BootstrapForm = () => {
    const [form,setForm]=useReducer((form,action) =>({...form,...action}),{login:'',password:''})
    console.log(form);
    const usersLogin = useLogin();
    function onsubmitHandler(e){
        e.preventDefault();
        usersLogin.mutate(form)
        setForm({login:'',password:''})
    }
    return (
        <div>
            <Form onSubmit={onsubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" placeholder="Enter login"
                                  value={form.login} onChange={(e) => setForm({login:e.target.value})}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  value={form.password} onChange={(e) => setForm({password:e.target.value})}/>/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default BootstrapForm;