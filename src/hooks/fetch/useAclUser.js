import {useContext} from "react";
import {UserContext} from "../../store/context/UserContext";
import {useMutation, useQuery} from "react-query";
import {api} from "../../api/axios-config";

export default function useAclUser() {

    const {isAuth: {sid}} = useContext(UserContext)

    // query acl_user_find
    const aclUserFindReqBody = {
        method: 'acl_user_find',
        sid,
        data: {limit: 1000, offset: 0}
    }
    const queryAclUserFind = useQuery(['acl_user_find', sid], async () => {
        const response = await api.post('/', aclUserFindReqBody);
        return response.data;
    }, {
        enabled: !!sid
    });

    // acl_user_create
    const mutationAclUserCreate = useMutation(newUserData => {
        const body = {
            method: 'acl_user_create',
            sid,
            data: {is_active: true, ...newUserData}
        }
        return api.post('/', body)
    })

    return { queryAclUserFind, mutationAclUserCreate }
}
