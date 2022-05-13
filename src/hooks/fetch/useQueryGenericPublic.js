import {useMutation, useQuery, useQueryClient} from "react-query";
import {apiGeneric} from "../../api/axios-config";
import toast from "react-hot-toast";

function useQueryGenericPublicFind(
    apiPath = '/',
    page = 1,
    limit = 10,
    sort = 'id',
    order = 'asc',
    query = '') {
    // ['generic_public_find', apiPath, page, limit, sort, order, query]
    return useQuery(['generic_public_find', apiPath], async () => {
        const response = await apiGeneric.get(`${apiPath}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&q=${query}`);
        return response.data;
    });
}

function useQueryGenericPublicFindOne(apiPath = '/', id) {
    return useQuery(['generic_public_find_one', apiPath, id], async () => {
        const response = await apiGeneric.get(`${apiPath}/${id}`);
        return response.data;
    });
}

function useMutationGenericPublicCreate(apiPath = '/') {
    const queryClient = useQueryClient();
    return useMutation(body => {
        return apiGeneric.post(apiPath, body);
    }, {
        onSuccess: (data) => {
            console.log("Create Data response: ", data);
            //const prevQueryData = queryClient.getQueryData(['generic_public_find', apiPath]);
            queryClient.setQueryData(['generic_public_find', apiPath], oldData => [data.data, ...oldData]);
        },
        onError: (error) => {
            toast(error.message)
        }
    });
}

function useMutationGenericPublicDelete(apiPath = '/') {
    const queryClient = useQueryClient()
    return useMutation(body => {
        return apiGeneric.delete(`${apiPath}/${body.id}`);
    }, {
        onSuccess: (data, variables) => {
            //const prevQueryData = queryClient.getQueryData(['generic_public_find', apiPath]);
            queryClient.setQueryData(['generic_public_find', apiPath], oldData => oldData.filter(item => item.id !== variables.id));
            queryClient.invalidateQueries(['generic_public_find_one', apiPath, variables.id]);
        },
        onError: (error) => {
            toast(error.message)
        }
    });
}

function useMutationGenericPublicUpdate(apiPath = '/') {
    const queryClient = useQueryClient();
    //console.log('QueryClient: ', queryClient)
    return useMutation(body => {
        return apiGeneric.put(`${apiPath}/${body.id}`, body);
    }, {
        onSuccess: (data, variables) => {
            //const prevQueryData = queryClient.getQueryData(['generic_public_find', apiPath]);
            queryClient.setQueryData(['generic_public_find', apiPath], oldData => oldData.map(item =>
                item.id === variables.id ? {...item, ...variables} : item
            ));
            queryClient.invalidateQueries(['generic_public_find_one', apiPath, variables.id]);
        },
        onError: (error) => {
            toast(error.message)
        }
    });
}

export {
    useQueryGenericPublicFind,
    useQueryGenericPublicFindOne,
    useMutationGenericPublicCreate,
    useMutationGenericPublicDelete,
    useMutationGenericPublicUpdate
}