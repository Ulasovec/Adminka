import {useContext} from "react";
import {UserContext} from "../../store/context/UserContext";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {api} from "../../api/axios-config";
import toast from "react-hot-toast";

// query acl_users_roles_find
function useQueryAclUsersRolesFind(limit = 1000, offset = 0) {
    const {isAuth: {sid}} = useContext(UserContext)
    const body = {
        method: 'acl_users_roles_find',
        sid,
        data: {limit, offset}
    }
    return useQuery(['acl_users_roles_find', sid, limit, offset], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid
    });
}

// query acl_users_roles_get_by_id
function useQueryAclUsersRolesGetById(user_role_id) {
    const {isAuth: {sid}} = useContext(UserContext)
    const body = {
        method: 'acl_users_roles_get_by_id',
        sid,
        data: {user_role_id}
    }
    return useQuery(['acl_users_roles_get_by_id', sid, user_role_id], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid && !!user_role_id
    });
}

// acl_users_roles_create
function useMutationAclUsersRolesCreate() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(newUsersRolesData => {
        const body = {
            method: 'acl_users_roles_create',
            sid,
            data: {is_active: true, ...newUsersRolesData}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_users_roles_find')
        },
        onError: (error) => {
            toast(error.message)
        }
    });
}

// acl_users_roles_delete
function useMutationAclUsersRolesDelete() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(user_role_id => {
        const body = {
            method: 'acl_users_roles_delete',
            sid,
            data: {user_role_id}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_users_roles_find')
            queryClient.invalidateQueries('acl_users_roles_get_by_id')
        },
        onError: (error) => {
            toast(error.message)
        }
    });
}

// acl_users_roles_update
function useMutationAclUsersRolesUpdate() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(usersRolesData => {
        const body = {
            method: 'acl_users_roles_update',
            sid,
            data: {...usersRolesData}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_users_roles_find')
            queryClient.invalidateQueries('acl_users_roles_get_by_id')
        },
        onError: (error) => {
            toast(error.message)
        }
    });
}

export {
    useQueryAclUsersRolesFind,
    useQueryAclUsersRolesGetById,
    useMutationAclUsersRolesCreate,
    useMutationAclUsersRolesDelete,
    useMutationAclUsersRolesUpdate
}