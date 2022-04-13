import {useContext} from "react";
import {UserContext} from "../../store/context/UserContext";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {api} from "../../api/axios-config";

// query acl_role_find
function useQueryAclRoleFind(limit = 100, offset = 0) {
    const {isAuth: {sid}} = useContext(UserContext)
    const body = {
        method: 'acl_role_find',
        sid,
        data: {limit, offset}
    }
    return useQuery(['acl_role_find', sid, limit, offset], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid
    });
}

// query acl_role_get_by_id
function useQueryAclRoleGetById(role_id) {
    const {isAuth: {sid}} = useContext(UserContext)
    const body = {
        method: 'acl_role_get_by_id',
        sid,
        data: {role_id}
    }
    return useQuery(['acl_role_get_by_id', sid, role_id], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid && !!role_id
    });
}

// acl_role_create
function useMutationAclRoleCreate() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(newRoleData => {
        const body = {
            method: 'acl_role_create',
            sid,
            data: {is_active: true, ...newRoleData}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_role_find')
        },
    });
}

// acl_role_delete
function useMutationAclRoleDelete() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(role_id => {
        const body = {
            method: 'acl_role_delete',
            sid,
            data: {role_id}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_role_find')
            queryClient.invalidateQueries('acl_role_get_by_id')
        },
    });
}

// acl_role_update
function useMutationAclRoleUpdate() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(roleData => {
        const body = {
            method: 'acl_role_update',
            sid,
            data: {...roleData}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_role_find')
            queryClient.invalidateQueries('acl_role_get_by_id')
        },
    });
}

export {
    useQueryAclRoleFind,
    useQueryAclRoleGetById,
    useMutationAclRoleCreate,
    useMutationAclRoleDelete,
    useMutationAclRoleUpdate
}