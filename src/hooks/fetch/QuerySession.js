import {useContext} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import {UserContext} from "../../context/UserContext";


export const useQuerySession = () => {
    const {sid,setRoleId} = useContext(UserContext);
    const body = {
        method: 'acl_session_info',
        sid,
        data: {}
    }
    const querySession = useQuery(['session', sid], async () => {
        const response = await axios.post(process.env.REACT_APP_API_URL, body);

        return response.data;
    }, {enabled: !!sid, onSuccess: (data) => {console.log(data);setRoleId(data?.data?.payload?.role_id)}});
    return querySession;
}