import {useContext} from "react";
import {useQuery} from "react-query";
import {UserContext} from "../../store/context/UserContext";
import {api} from "../../api/axios-config";
import axios from "axios";


export const useUserInfo = () => {
    const {isAuth: {sid}, setIsAuth} = useContext(UserContext);

    // acl_session_info
    const sessionInfoReqBody = {
        method: 'acl_session_info',
        sid,
        data: {}
    }
    const querySession = useQuery(['session', sid], async () => {
        const response = await api.post('/', sessionInfoReqBody);
        return response.data;
    }, {
        enabled: !!sid
    });
    const {data: {data: {payload: {user_id, role_id, app_id}}}} = querySession;

    // acl_role_get_by_id
    const roleGetReqBody = {
        method: 'acl_role_get_by_id',
        sid,
        data: {role_id}
    }
    const queryRole = useQuery(['role', sid, role_id], async () => {
        const response = await api.post('/', roleGetReqBody);
        return response.data;
    }, {
        enabled: !!sid && !!role_id
    });
    const {data: {data: {name: role_name, about: role_about, is_active: role_is_active}}} = queryRole;

    return {querySession, user_id, role_id, app_id, queryRole, role_name, role_about, role_is_active};
}
