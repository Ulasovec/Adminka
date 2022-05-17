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
    const INIT_LIMIT = 10;
    const [limit, setLimit] = useState(INIT_LIMIT);
    //const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const [sortBy, setSortBy] = useState({key: 'id', order: 'asc'});
    //const [sortOrder, setSortOrder] = useState('asc');
    const [queryString, setQueryString] = useState('');

    const queryParams = {offset, limit, sort: sortBy.key, order: sortBy.order, query: queryString};

    const queryFind = useQueryGenericPublicFind(apiPath, queryParams);
    const mutationCreate = useMutationGenericPublicCreate(apiPath, queryParams);
    const mutationUpdate = useMutationGenericPublicUpdate(apiPath, queryParams);
    const mutationDelete = useMutationGenericPublicDelete(apiPath, queryParams);

    function handleCreate(body) {
        mutationCreate.mutate(body);
    }

    function handleUpdate(body) {
        mutationUpdate.mutate(body);
    }

    function handleDelete(body) {
        mutationDelete.mutate(body);
    }

    function handleSortBy(sortBy) {
        setSortBy(sortBy);
        //setLimit(INIT_LIMIT);
    }

    function handleLimit(limit) {
        setLimit(limit);
    }

    return (
        <GenericProvider value={{
            queryFindData: queryFind.data ?? [],
            handleCreate,
            handleUpdate,
            handleDelete,
            sortBy,
            handleSortBy,
            handleLimit
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