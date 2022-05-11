import {useContext} from "react";
import {useQuery} from "react-query";
import {UserContext} from "../../store/context/UserContext";
import {api} from "../../api/axios-config";


export const useUserInfo = () => {
    const {isAuth: {sid}, setIsAuth} = useContext(UserContext);

    // acl_session_info
    const sessionInfoReqBody = {
        method: 'api_acl_session_info',
        sid,
        data: {}
    }
    const querySession = useQuery(['session', sid], async () => {
        const response = await api.post('/', sessionInfoReqBody);
        return response.data;
    }, {
        enabled: !!sid
    });
    //const {data: {data: {payload: {user_id, role_id, app_id}}}} = querySession;
    const user_id = querySession.data?.data?.payload?.user_id;
    const role_id = querySession.data?.data?.payload?.role_id;
    const app_id = querySession.data?.data?.payload?.app_id;

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
    //const {data: {data: {name: role_name, about: role_about, is_active: role_is_active}}} = queryRole;
    const role_name = queryRole.data?.data?.name;
    const role_about = queryRole.data?.data?.about;
    const role_is_active = queryRole.data?.data?.is_active;

    // acl_user_get_by_id
    const userGetReqBody = {
        method: 'acl_user_get_by_id',
        sid,
        data: {user_id}
    }
    const queryUser = useQuery(['user', sid, user_id], async () => {
        const response = await api.post('/', userGetReqBody);
        return response.data;
    }, {
        enabled: !!sid && !!user_id
    });
    //const {data: {data: {name: user_name, is_active: user_is_active}}} = queryUser;
    const user_name = queryUser.data?.data?.name;
    const user_is_active = queryUser.data?.data?.is_active;

    return {
        querySession,
        user_id,
        role_id,
        app_id,
        queryRole,
        role_name,
        role_about,
        role_is_active,
        queryUser,
        user_name,
        user_is_active
    };
}
