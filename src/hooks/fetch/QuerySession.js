import {useContext} from "react";
import {useQuery} from "react-query";
import {UserContext} from "../../store/context/UserContext";
import {api} from "../../api/axios-config";

export const useQuerySession = () => {
    const {isAuth: {sid}} = useContext(UserContext);
    const body = {
        method: 'acl_session_info',
        sid,
        data: {}
    }
    return useQuery(['session', sid], async () => {
        const response = await api.post('/', body);
        return response.data;
    }, {
        enabled: !!sid
    });
}
