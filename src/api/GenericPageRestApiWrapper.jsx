import React, {useState} from 'react';
import {
    useMutationGenericPublicCreate, useMutationGenericPublicDelete,
    useMutationGenericPublicUpdate,
    useQueryGenericPublicFind
} from "../hooks/fetch/useQueryGenericPublic";
import GenericPageContent from "../components/Content/GenericPageContent";

const GenericPageRestApiWrapper = ({apiPath, schema, uiSchema}) => {
    const LIMIT = 100;
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [queryString, setQueryString] = useState('');

    const queryFind = useQueryGenericPublicFind(apiPath, page, LIMIT, sortBy, sortOrder, queryString);
    const mutationCreate = useMutationGenericPublicCreate(apiPath);
    const mutationUpdate = useMutationGenericPublicUpdate(apiPath);
    const mutationDelete = useMutationGenericPublicDelete(apiPath);

    function handleCreate(body) {
        mutationCreate.mutate(body);
    }

    function handleUpdate(body) {
        mutationUpdate.mutate(body);
    }

    function handleDelete(body) {
        mutationDelete.mutate(body);
    }

    return (
        <GenericPageContent
            dataArray={queryFind.data ?? []}
            schema={schema}
            uiSchema={uiSchema}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
        />
    );
};

export default GenericPageRestApiWrapper;