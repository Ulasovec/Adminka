import React, {useEffect, useState} from 'react';
import {Button, Container, Form, FormControl, InputGroup} from "react-bootstrap";
import BootstrapUsersTable from "../components/BootstrapTable/BootstrapUsersTable";

import useUserNameReducer from "../store/reducers/UserNameReducer";
import CreateRoleModal from "../components/BootstrapModal/CreateRoleModal";
import CreateUsersModal from "../components/BootstrapModal/CreateUsersModsl";
import { BsPencil } from "react-icons/bs"
import MyButtonForm from "../UI components/MyButtonForm";

const UsersPage = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState(1)

    const [createUser,setCreateUser] = useState([]);
    const [checkArray,setCheckArray] = useState([])
    const {users, setUsersName} = useUserNameReducer()

    const [modal, setModal] = useState(false);
    const [putUser,setPutUser] = useState({});

    useEffect(()=> setCreateUser([...createUser.filter(item => item.id !== undefined),users]),[users])


    function deleteUsers(id){
        setCreateUser (createUser.filter(item => item.id !== id))
    }
    function deleteArray(checkArray){
        // console.log(checkArray.filter(item => item.checked === false).map(item => item.id))
        setCreateUser (createUser.filter(i => !checkArray.filter(item => item.checked === false).map(item => item.id).includes(i.id)));
        setCheckArray([]);

    }
    function inputHandler(e){
        e.preventDefault();
        setUsersName({id : id, userName : name });
        setId(id + 1);
        setName('');
    }
    function putUsers(id){

        setModal(true);
        setPutUser(createUser.filter(item => item.id === id)[0])
    }
    return (
        <Container>
        <h1 style={{fontSize: '1.75em',textAlign:'center'}}>
            ||| Create users |||
        </h1>
            <Form onSubmit={inputHandler}>
                <div style={{display:'flex',justifyContent: 'flex-end'}}>
                 <MyButtonForm ><BsPencil style={{fontSize: '2em' }}/></MyButtonForm>
                </div>
                <Form.Label>UserName</Form.Label>
            <InputGroup className="mb-3" >
                <FormControl
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={name}
                    onChange={(event => setName(event.target.value))}

                />

            </InputGroup>

            </Form>
            {(checkArray.find(item => item.checked === false))
            ?<Button variant="outline-danger" onClick={()=>deleteArray(checkArray)}>Delete</Button>
                :null
            }

               <BootstrapUsersTable createUser={createUser}
                                    usersId={users.id}
                                    deleteUsers={deleteUsers}
                                    checkArray = {checkArray}
                                    setCheckArray = {setCheckArray}
                                    putUsers = {putUsers}
                />
            {(modal)
                ?<CreateUsersModal
                    setModal = {setModal}
                    putUser = {putUser}
                    createUser = {createUser}
                    setCreateUser = {setCreateUser}
                />
                :null
            }

            </Container>
    );
};

export default UsersPage;