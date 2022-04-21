import React from 'react';
import {useMutationAclApplicationCreate, useQueryAclApplicationFind} from "../hooks/fetch/useAclApplication";
import {Row} from "react-bootstrap";
import ApplicationForm from "../components/BootstrapForm/ApplicationForm";
import MyBootstrapTable from "../components/MyTable/MyBootstrapTable";

const ApplicationsPage = () => {
    const {isLoading, isError, data, error} = useQueryAclApplicationFind();
    const mutationAclApplicationCreate = useMutationAclApplicationCreate();

    function createApplication(applicationData) {
        console.log('App Data', applicationData);
        mutationAclApplicationCreate.mutate(applicationData);
    }

    if (isLoading) {
        return <span>Loading...</span>
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
            {/*<Row className="mt-5">*/}
            {/*    <ul>*/}
            {/*        {data.data.applications.map((app, index) => (*/}
            {/*            <li key={app.id}>*/}
            {/*                <pre>{index} | {app.id} | {app.name} | {app.about} | {app.is_active ? 'Active' : 'Not active'}</pre>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</Row>*/}
            <MyBootstrapTable contentRow={data.data.applications}/>
        </div>
    );
};

export default ApplicationsPage;