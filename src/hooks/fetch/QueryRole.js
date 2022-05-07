import {useContext} from "react";
import {useQuery} from "react-query";
import {UserContext} from "../../store/context/UserContext";
import {api} from "../../api/axios-config";

/**
 * !!! Не используется. Этот хук можно удалить.
 */

export const useQueryRole = (role_id) => {
    const {isAuth: {sid}} = useContext(UserContext);
    const body = {
        method: 'acl_role_get_by_id',
        sid,
        data: {role_id}
    }
    return  useQuery(['role', sid, role_id], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid && !!role_id
    });
}
