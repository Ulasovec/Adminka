import React, {useState} from 'react';
import {Form, FormControl, InputGroup, Spinner} from "react-bootstrap";
import {BsPlusSquare} from "react-icons/bs"
import MyButtonForm from "../UI components/myButtom/MyButtonForm";
import {
    useMutationAclUserCreate,
    useMutationAclUserDelete,
    useMutationAclUserUpdate,
    useQueryAclUserFind
} from "../hooks/fetch/useAclUser";
import {useNavigate} from 'react-router-dom';
import MyBootstrapTable from "../components/MyTable/MyBootstrapTable";
import MyPutModal from "../components/MyModal/MyPutModal";
import {useSortedAndFilteredList} from "../hooks/SortedFilter/SortFilter";
import SearchSortForm from "../components/MySearchSortForm/SearchSortForm";
import MyTransitions from "../components/MyTransitions/MyTransitions";


const UsersPage = () => {
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);
    const [putUser, setPutUser] = useState({});
    const navigate = useNavigate();
    const queryAclUserFind = useQueryAclUserFind(1000, 0);
    const mutationAclUserCreate = useMutationAclUserCreate()
    const mutationAclUserUpdate = useMutationAclUserUpdate()
    const mutationAclUserDelete = useMutationAclUserDelete()
    const createUser = queryAclUserFind.data?.data?.users ?? []
    // Получаем данные чтобы отправить их в хук useSortedAndFilteredList.
    const [filter, setFilter] = useState({sortBy: '', query: ''})
    // Отсортированный и фильтрованный список.
    const sortedAndFilteredUsers = useSortedAndFilteredList(createUser, filter.sortBy, filter.query)

    function deleteUsers(id) {
        mutationAclUserDelete.mutate(id)
    }

    function deleteArray(userIdsToDelete) {
        userIdsToDelete.forEach(id => mutationAclUserDelete.mutate(id));
    }

    function inputHandler(e) {
        e.preventDefault();
        mutationAclUserCreate.mutate({name})
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

    if (queryAclUserFind.isLoading) {
        return <Spinner animation="border" variant="secondary"/>
    }

    if (queryAclUserFind.isError) {
        return <span>Error: {queryAclUserFind.error.message}</span>
    }

    return (
        <div>
            <h1 style={{fontSize: '1.75em', textAlign: 'center'}}>
                ||| Create users |||
            </h1>
            <Form onSubmit={inputHandler}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <MyButtonForm data-title="Add"><BsPlusSquare style={{fontSize: '1.8em'}}/></MyButtonForm>
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

            <MyTransitions>
                <SearchSortForm filter={filter}
                                setFilter={setFilter}
                                itemList={createUser}/>
            </MyTransitions>
            <MyBootstrapTable contentRow={sortedAndFilteredUsers}
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