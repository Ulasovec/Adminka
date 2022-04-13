import React, {useEffect, useState} from 'react';
import {Button, Container, Form, FormControl, InputGroup} from "react-bootstrap";
import BootstrapUsersTable from "../components/BootstrapTable/BootstrapUsersTable";
import CreateUsersModal from "../components/BootstrapModal/CreateUsersModsl";
import { BsPencil } from "react-icons/bs"
import MyButtonForm from "../UI components/MyButtonForm";
import {
    useMutationAclUserCreate,
    useMutationAclUserDelete,
    useMutationAclUserUpdate,
    useQueryAclUserFind
} from "../hooks/fetch/useAclUser";
import {useNavigate} from 'react-router-dom';

const UsersPage = () => {
    const [name, setName] = useState('');
    //const [id, setId] = useState(1)

    //const [createUser,setCreateUser] = useState([]);
    const [checkArray, setCheckArray] = useState([])
    //const {users, setUsersName} = useUserNameReducer()

    const [modal, setModal] = useState(false);
    const [putUser, setPutUser] = useState({});
    const navigate = useNavigate();
    const queryAclUserFind = useQueryAclUserFind(1000, 0);
    const createUser = queryAclUserFind.data?.data?.users ?? []
    const mutationAclUserCreate = useMutationAclUserCreate()
    const mutationAclUserUpdate = useMutationAclUserUpdate()
    const mutationAclUserDelete = useMutationAclUserDelete()

    //useEffect(()=> setCreateUser([...createUser.filter(item => item.id !== undefined),users]),[users])


    function deleteUsers(id) {
        //setCreateUser (createUser.filter(item => item.id !== id))
        mutationAclUserDelete.mutate(id)
    }

    function deleteArray(checkArray) {
        // console.log(checkArray.filter(item => item.checked === false).map(item => item.id))
        //setCreateUser (createUser.filter(i => !checkArray.filter(item => item.checked === false).map(item => item.id).includes(i.id)));
        const userIdsToDelete = checkArray.filter(item => item.checked === false).map(item => item.id)
        userIdsToDelete.forEach(id => mutationAclUserDelete.mutate(id))
        setCheckArray([]);

    }

    function inputHandler(e) {
        e.preventDefault();
        //setUsersName({id : id, userName : name });
        mutationAclUserCreate.mutate({name})
        //setId(id + 1);
        setName('');
    }

    function putUsers(id) {
        setModal(true);
        setPutUser(createUser.filter(item => item.id === id)[0])
    }

    function updatePutUser({id: user_id, name, is_active}) {
        mutationAclUserUpdate.mutate({user_id, name, is_active});
    }
    function createUsersRole(id){
        navigate(`/users/${id}`)
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
            {(checkArray.find(item => item.checked === false) || checkArray.length > 1)
                ? <Button variant="outline-danger" onClick={() => deleteArray(checkArray)}>Delete</Button>
                : null
            }

            <BootstrapUsersTable createUser={createUser}
                                 deleteUsers={deleteUsers}
                                 checkArray={checkArray}
                                 setCheckArray={setCheckArray}
                                 putUsers={putUsers}
                                 createUsersRole = {createUsersRole}
            />
            {(modal)
                ? <CreateUsersModal
                    setModal={setModal}
                    putUser={putUser}
                    handlePutUser={updatePutUser}
                />
                : null
            }

        </Container>
    );
};

export default UsersPage;