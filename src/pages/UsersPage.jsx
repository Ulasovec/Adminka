import React, {useState} from 'react';
import { Form, FormControl, InputGroup} from "react-bootstrap";
import {BsPlusSquare} from "react-icons/bs"
import MyButtonForm from "../UI components/MyButtonForm";
import {
    useMutationAclUserCreate,
    useMutationAclUserDelete,
    useMutationAclUserUpdate,
    useQueryAclUserFind
} from "../hooks/fetch/useAclUser";
import {useNavigate} from 'react-router-dom';
import MyBootstrapTable from "../components/MyTable/MyBootstrapTable";
import MyPutModal from "../components/MyModal/MyPutModal";


const UsersPage = () => {
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);
    const [putUser, setPutUser] = useState({});
    const navigate = useNavigate();
    const queryAclUserFind = useQueryAclUserFind(1000, 0);
    const createUser = queryAclUserFind.data?.data?.users ?? []
    const mutationAclUserCreate = useMutationAclUserCreate()
    const mutationAclUserUpdate = useMutationAclUserUpdate()
    const mutationAclUserDelete = useMutationAclUserDelete()

    //useEffect(()=> setCreateUser([...createUser.filter(item => item.id !== undefined),users]),[users])
    console.log(createUser)

    function deleteUsers(id) {
        //setCreateUser (createUser.filter(item => item.id !== id))
        mutationAclUserDelete.mutate(id)
    }

    function deleteArray(userIdsToDelete) {
        // console.log(checkArray.filter(item => item.checked === false).map(item => item.id))
        //setCreateUser (createUser.filter(i => !checkArray.filter(item => item.checked === false).map(item => item.id).includes(i.id)));
        userIdsToDelete.forEach(id => mutationAclUserDelete.mutate(id))
        ;

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

    function createUsersRole(id) {
        navigate(`/users/${id}`)
    }

    return (
        <div>
            <h1 style={{fontSize: '1.75em', textAlign: 'center'}}>
                ||| Create users |||
            </h1>
            <Form onSubmit={inputHandler} >
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <MyButtonForm data-title="Add" ><BsPlusSquare style={{fontSize: '1.8em'}}/></MyButtonForm>
                </div>
                <Form.Label>UserName</Form.Label>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={name}
                        onChange={(event => setName(event.target.value))}

                    />

                </InputGroup>

            </Form>


            <MyBootstrapTable contentRow={createUser}
                              deleteRow={deleteUsers}
                              putRow={putUsers}
                              createUsersRole={createUsersRole}
                              deleteArrayRow={deleteArray}
            />
            {(modal)
                ? <MyPutModal
                    setModal={setModal}
                    putForm={putUser}
                    handlePutForm={updatePutUser}
                />
                : null
            }


        </div>
    );
};

export default UsersPage;