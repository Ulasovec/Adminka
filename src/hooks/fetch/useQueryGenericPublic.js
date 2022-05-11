import {useMutation, useQuery, useQueryClient} from "react-query";
import {apiGeneric} from "../../api/axios-config";
import toast from "react-hot-toast";

function useQueryGenericPublicFind(
    apiPath = '/',
    page = 1,
    limit = 1000,
    sort = 'id',
    order = 'asc',
    query = '') {
    return useQuery(['generic_public_find', apiPath, page, limit, sort, order, query], async () => {
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
            const prevQueryData = queryClient.getQueryData(['generic_public_find']);
            queryClient.setQueryData(['generic_public_find'], [data, ...prevQueryData]);
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
            const prevQueryData = queryClient.getQueryData(['generic_public_find']);
            queryClient.setQueryData(['generic_public_find'], prevQueryData.filter(item => item.id !== variables.id));
            queryClient.invalidateQueries(['generic_public_find_one', apiPath, variables.id]);
        },
        onError: (error) => {
            toast(error.message)
        }
    });
}

function useMutationGenericPublicUpdate(apiPath = '/') {
    const queryClient = useQueryClient()
    return useMutation(body => {
        return apiGeneric.put(apiPath, body);
    }, {
        onSuccess: (data, variables) => {
            const prevQueryData = queryClient.getQueryData(['generic_public_find']);
            queryClient.setQueryData(['generic_public_find'], prevQueryData.map(item =>
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