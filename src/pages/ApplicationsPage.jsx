import React, {useEffect, useState} from 'react';
import {
    useMutationAclApplicationCreate,
    useQueryAclApplicationFind,
    useMutationAclApplicationDelete,
    useMutationAclApplicationUpdate
} from "../hooks/fetch/useAclApplication";
import {Row, Spinner} from "react-bootstrap";
import ApplicationForm from "../components/BootstrapForm/ApplicationForm";
import MyBootstrapTable from "../components/MyTable/MyBootstrapTable";
import MyPutModal from "../components/MyModal/MyPutModal";
import {useSortedAndFilteredList} from "../hooks/SortedFilter/SortFilter";
import MyTransitions from "../components/MyTransitions/MyTransitions";
import SearchSortForm from "../components/MySearchSortForm/SearchSortForm";

const ApplicationsPage = () => {
    const {isLoading, isError, data, error} = useQueryAclApplicationFind();
    const mutationAclApplicationCreate = useMutationAclApplicationCreate();
    const mutationAclApplicationDelete = useMutationAclApplicationDelete();
    const [modal, setModal] = useState(false);
    const [putApplication, setPutApplication] = useState({});
    const app = data?.data?.applications ?? [];

    // Получаем данные чтобы отправить их в хук useSortedAndFilteredList.
    const [filter, setFilter] = useState({sortBy: '', query: ''})
    // Отсортированный и фильтрованный список.
    const sortedAndFilteredApp = useSortedAndFilteredList(app, filter.sortBy, filter.query)



    function createApplication(applicationData) {
        console.log('App Data', applicationData);
        mutationAclApplicationCreate.mutate(applicationData);
    }

    function deleteApplication(id) {
        mutationAclApplicationDelete.mutate(id);
    }

    function deleteArray(userIdsToDelete) {
        userIdsToDelete.forEach(id => mutationAclApplicationDelete.mutate(id));
    }

    function putApp(id) {
        setModal(true);
        setPutApplication(data.data.applications.filter(item => item.id === id)[0])
    }

    if (isLoading) {
        return <Spinner animation="border" variant="secondary"/>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div>
            <h1 style={{fontSize: '1.75em', textAlign: 'center'}}>||| Applications |||</h1>
            <Row>
                <ApplicationForm handleSubmit={createApplication}/>
            </Row>
            <MyTransitions>
                <SearchSortForm filter={filter}
                                setFilter={setFilter}
                                itemList={app}/>
            </MyTransitions>
            <MyBootstrapTable contentRow={sortedAndFilteredApp}
                              deleteRow={deleteApplication}
                              putRow={putApp}
                              deleteArrayRow={deleteArray}/>
            {(modal)
                ? <MyPutModal
                    setModal={setModal}
                    putForm={putApplication}
                />
                : null
            }

        </div>


    );
};

export default ApplicationsPage;