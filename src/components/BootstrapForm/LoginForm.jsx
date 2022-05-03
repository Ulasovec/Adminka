import React, {useReducer} from 'react';
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import useLogin from "../../hooks/fetch/useLogin";

import InfoModal from "../BootstrapModal/InfoModal";

const LoginForm = () => {
    const [form, setForm] = useReducer((form, action) => ({...form, ...action}),
        {login: '', password: ''})
    const usersLogin = useLogin();

    function onsubmitHandler(e) {
        e.preventDefault();
        console.log('Login form: ', form);
        usersLogin.mutate(form);
        setForm({login: '', password: ''});
    }

    if (usersLogin.isLoading) return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">Login...<Spinner animation="border" variant="secondary"/></Col>
            </Row>
        </Container>
    )

    return (
        <div>
            <Container>
                <h1>Please Sign In</h1>
                <Form onSubmit={onsubmitHandler} style={{maxWidth: "50%"}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter login"
                            value={form.login}
                            onChange={(e) => setForm({login: e.target.value})}
                        />
                        {/*<Form.Text className="text-muted">
                            We'll never share your login with anyone else.
                        </Form.Text>*/}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({password: e.target.value})}
                        />
                        {/*<Form.Text className="text-muted">
                            We'll never share your password anyone else.
                        </Form.Text>*/}
                    </Form.Group>

                    {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                    </Form.Group>*/}

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
            <Container>
                {/*{ usersLogin.isSuccess && usersLogin.data?.data?.result?.code !== 'OK' ?*/}
                {/*    <div>{usersLogin.data?.data?.result?.code}</div> : null }*/}
                {usersLogin.isError ?
                    <InfoModal title="Login failed"
                               message={usersLogin.error.data?.result?.code ?? usersLogin.error.message}/> : null}
                {/*{ usersLogin.isSuccess && usersLogin.data?.data?.result?.code !== 'OK' ?
                    <BootModal/> : null }*/}
            </Container>
        </div>
    );
};

export default LoginForm;