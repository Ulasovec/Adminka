import {useMutation, useQuery, useQueryClient} from "react-query";
import {apiGeneric} from "../../api/axios-config";
import toast from "react-hot-toast";

function useQueryGenericPublicFind(apiPath = '/', queryParams ) {
    const {offset = 0, limit = 10, sort = 'id', order = 'asc', query = ''} = queryParams;
    // ['generic_public_find', apiPath, offset, limit, sort, order, query]
    return useQuery(['generic_public_find', apiPath, queryParams], async () => {
        const response = await apiGeneric.get(`${apiPath}?_start=${offset}&_limit=${limit}&_sort=${sort}&_order=${order}&q=${query}`);
        return response.data;
    }, { keepPreviousData : true });
}

function useQueryGenericPublicFindOne(apiPath = '/', id) {
    return useQuery(['generic_public_find_one', apiPath, id], async () => {
        const response = await apiGeneric.get(`${apiPath}/${id}`);
        return response.data;
    });
}

function useMutationGenericPublicCreate(apiPath = '/', queryParams) {
    const queryClient = useQueryClient();
    return useMutation(body => {
        return apiGeneric.post(apiPath, body);
    }, {
        onSuccess: (data) => {
            console.log("Create Data response: ", data);
            //const prevQueryData = queryClient.getQueryData(['generic_public_find', apiPath]);
            queryClient.setQueryData(['generic_public_find', apiPath, queryParams], oldData => [data.data, ...oldData]);
        },
        onError: (error) => {
            toast(error.message)
        }
    });
}

function useMutationGenericPublicDelete(apiPath = '/', queryParams) {
    const queryClient = useQueryClient()
    return useMutation(body => {
        return apiGeneric.delete(`${apiPath}/${body.id}`);
    }, {
        onSuccess: (data, variables) => {
            //const prevQueryData = queryClient.getQueryData(['generic_public_find', apiPath]);
            queryClient.setQueryData(['generic_public_find', apiPath, queryParams], oldData => oldData.filter(item => item.id !== variables.id));
            queryClient.invalidateQueries(['generic_public_find_one', apiPath, variables.id]);
        },
        onError: (error) => {
            toast(error.message)
        }
    });
}

function useMutationGenericPublicUpdate(apiPath = '/', queryParams) {
    const queryClient = useQueryClient();
    //console.log('QueryClient: ', queryClient)
    return useMutation(body => {
        return apiGeneric.put(`${apiPath}/${body.id}`, body);
    }, {
        onSuccess: (data, variables) => {
            //const prevQueryData = queryClient.getQueryData(['generic_public_find', apiPath]);
            queryClient.setQueryData(['generic_public_find', apiPath, queryParams], oldData => oldData.map(item =>
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