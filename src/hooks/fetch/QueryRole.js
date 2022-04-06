import {useContext} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import {UserContext} from "../../store/context/UserContext";


export const useQueryRole = () => {
    const {isAuth} = useContext(UserContext);
    const body = {
        method: 'acl_role_get_by_id',
        sid: isAuth.sid,
        data: {role_id: isAuth.role_id}
    }
    const querySession = useQuery(['role', isAuth.sid, isAuth.role_id], async () => {
        const response = await axios.post(process.env.REACT_APP_API_URL, body);

        return response.data;
    }, {enabled: !! isAuth.role_id, onSuccess: (data) => {console.log(data)}});
    return querySession;
}