import {useContext} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import {UserContext} from "../../context/UserContext";


export const useQueryRole = () => {
    const {sid,roleId} = useContext(UserContext);
    const body = {
        method: 'acl_role_get_by_id',
        sid,
        data: {role_id: roleId}
    }
    const querySession = useQuery(['role', sid, roleId], async () => {
        const response = await axios.post(process.env.REACT_APP_API_URL, body);

        return response.data;
    }, {enabled: !!roleId, onSuccess: (data) => {console.log(data)}});
    return querySession;
}