import React, {useState} from 'react';
import {
    useMutationGenericPublicCreate, useMutationGenericPublicDelete,
    useMutationGenericPublicUpdate,
    useQueryGenericPublicFind
} from "../hooks/fetch/useQueryGenericPublic";
import GenericPageContent from "../components/Content/GenericPageContent";
import {GenericProvider} from "../store/context/GenericContext";
import {SortOrder} from 'react-base-table';

const GenericPageRestApiWrapper = ({children, apiPath}) => {
    const LIMIT = 10;
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState({key: 'id', order: 'asc'});
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
        <GenericProvider value={{
            queryFindData: queryFind.data ?? [],
            handleCreate,
            handleUpdate,
            handleDelete,
            sortBy,
            setSortBy
        }}>
            {children}
        </GenericProvider>
        /*<GenericPageContent
            dataArray={queryFind.data ?? []}
            schema={schema}
            uiSchema={uiSchema}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
        />*/
    );
};

export default GenericPageRestApiWrapper;