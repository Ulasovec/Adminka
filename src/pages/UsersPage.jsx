import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, FormControl, InputGroup} from "react-bootstrap";
import BootstrapTable from "../components/BootstrapTable/BootstrapTable";
import {UserContext} from "../store/context/UserContext";


const UsersPage = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState(1)
    const {users, setUsersName} = useContext(UserContext)
    const [createUser,setCreateUser] = useState([]);
    const [checkArray,setCheckArray] = useState([])


    console.log(users);
    console.log(createUser);


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
        setId(id +1);
        setUsersName({id : id, userName : name });
        setName('');
    }

    return (
        <Container>
        <h1 style={{fontSize: '1.75em',textAlign:'center'}}>
            ||| UsersPage |||
        </h1>
            <h2>Create users</h2>
            <Form onSubmit={inputHandler}>
            <InputGroup className="mb-3" >
                <FormControl
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={name}
                    onChange={(event => setName(event.target.value))}

                />
                <Button variant="outline-success" id="button-addon2" type="submit" style={{marginRight:'8px'}}>
                    Create
                </Button>
            </InputGroup>

            </Form>
            {(checkArray.find(item => item.checked === false))
            ?<Button variant="outline-danger" onClick={()=>deleteArray(checkArray)}>Delete</Button>
                :null
            }

               <BootstrapTable createUser={createUser}
                                  usersId={users.id}
                                  deleteUsers={deleteUsers}
                                  checkArray = {checkArray}
                                  setCheckArray = {setCheckArray}

                />


            </Container>
    );
};

export default UsersPage;