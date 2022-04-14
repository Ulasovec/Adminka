import React from 'react';
import {useQueryAclApplicationFind} from "../hooks/fetch/useAclApplication";
import {Container} from "react-bootstrap";

const ApplicationsPage = () => {
    const {isLoading, isError, data, error} = useQueryAclApplicationFind()

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <Container>
            <h1>Applications</h1>
            <ul>
                {data.data.applications.map((app, index) => (
                    <li key={app.id}><pre>{index} | {app.id} | {app.name} | {app.about} | {app.is_active}</pre></li>
                ))}
            </ul>
        </Container>
    );
};

export default ApplicationsPage;