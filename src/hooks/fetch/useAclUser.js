import {useContext} from "react";
import {UserContext} from "../../store/context/UserContext";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {api} from "../../api/axios-config";

// query acl_user_find
function useQueryAclUserFind(limit = 1000, offset = 0) {
    const {isAuth: {sid}} = useContext(UserContext)
    const body = {
        method: 'acl_user_find',
        sid,
        data: {limit, offset}
    }
    return useQuery(['acl_user_find', sid, limit, offset], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid
    });
}

// query acl_user_get_by_id
function useQueryAclUserGetById(user_id) {
    const {isAuth: {sid}} = useContext(UserContext)
    const body = {
        method: 'acl_user_get_by_id',
        sid,
        data: {user_id}
    }
    return useQuery(['acl_user_get_by_id', sid, user_id], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid && !!user_id
    });
}

// acl_user_create
function useMutationAclUserCreate() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(newUserData => {
        const body = {
            method: 'acl_user_create',
            sid,
            data: {is_active: true, ...newUserData}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_user_find')
        },
    });
}

// acl_user_delete
function useMutationAclUserDelete() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(user_id => {
        const body = {
            method: 'acl_user_delete',
            sid,
            data: {user_id}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_user_find')
            queryClient.invalidateQueries('acl_user_get_by_id')
        },
    });
}

// acl_user_update
function useMutationAclUserUpdate() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(userData => {
        const body = {
            method: 'acl_user_update',
            sid,
            data: {...userData}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_user_get_by_id')
        },
    });
}

export {
    useQueryAclUserFind,
    useQueryAclUserGetById,
    useMutationAclUserCreate,
    useMutationAclUserDelete,
    useMutationAclUserUpdate
}