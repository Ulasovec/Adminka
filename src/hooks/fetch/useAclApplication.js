import {useContext} from "react";
import {UserContext} from "../../store/context/UserContext";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {api} from "../../api/axios-config";

// query acl_application_find
function useQueryAclApplicationFind(limit = 100, offset = 0) {
    const {isAuth: {sid}} = useContext(UserContext)
    const body = {
        method: 'acl_application_find',
        sid,
        data: {limit, offset}
    }
    return useQuery(['acl_application_find', sid, limit, offset], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid
    });
}

// query acl_application_get_by_id
function useQueryAclApplicationGetById(application_id) {
    const {isAuth: {sid}} = useContext(UserContext)
    const body = {
        method: 'acl_application_get_by_id',
        sid,
        data: {application_id}
    }
    return useQuery(['acl_application_get_by_id', sid, application_id], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid && !!application_id
    });
}

// acl_application_create
function useMutationAclApplicationCreate() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(newApplicationData => {
        const body = {
            method: 'acl_application_create',
            sid,
            data: {is_active: true, ...newApplicationData}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_application_find')
        },
    });
}

// acl_application_delete
function useMutationAclApplicationDelete() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(application_id => {
        const body = {
            method: 'acl_application_delete',
            sid,
            data: {application_id}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_application_find')
            queryClient.invalidateQueries('acl_application_get_by_id')
        },
    });
}

// acl_application_update
function useMutationAclApplicationUpdate() {
    const {isAuth: {sid}} = useContext(UserContext)
    const queryClient = useQueryClient()
    return useMutation(applicationData => {
        const body = {
            method: 'acl_application_update',
            sid,
            data: {...applicationData}
        }
        return api.post('/', body)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('acl_application_find')
            queryClient.invalidateQueries('acl_application_get_by_id')
        },
    });
}

export {
    useQueryAclApplicationFind,
    useQueryAclApplicationGetById,
    useMutationAclApplicationCreate,
    useMutationAclApplicationDelete,
    useMutationAclApplicationUpdate
}