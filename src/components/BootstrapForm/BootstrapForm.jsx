import React, {useContext, useReducer} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import useLogin from "../../hooks/fetch/Users";
import {UserContext} from "../../context/UserContext";

const BootstrapForm = () => {
    const [form, setForm] = useReducer((form, action) => ({...form, ...action}), {login: '', password: ''})
    console.log(form);
    console.log('ENV: ', process.env.REACT_APP_API_URL)
    const usersLogin = useLogin();
    const {setIsAuth} = useContext(UserContext);

    function onsubmitHandler(e) {
        e.preventDefault();
        const body = {
            method: "acl_sign_in_login_password",
            data: {
                login: "test_admin001@test.domain",
                password: "password",
                app_id: "b7177966-2735-4411-9ae7-acff92762510",
                timeout: 10000.0
            }
        }
        //usersLogin.mutate(form)
        usersLogin.mutate(body);
        setForm({login: '', password: ''});
        setIsAuth(true);
    }

    return (
        <div>
            <Container>
                <Form onSubmit={onsubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" placeholder="Enter login"
                                      value={form.login} onChange={(e) => setForm({login: e.target.value})}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      value={form.password} onChange={(e) => setForm({password: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default BootstrapForm;