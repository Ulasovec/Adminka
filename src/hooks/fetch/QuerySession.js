import {useContext} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import {UserContext} from "../../store/context/UserContext";


export const useQuerySession = () => {
    const {isAuth,setIsAuth} = useContext(UserContext);
    const body = {
        method: 'acl_session_info',
        sid: isAuth.sid,
        data: {}
    }
    const querySession = useQuery(['session', isAuth.sid], async () => {
        const response = await axios.post(process.env.REACT_APP_API_URL, body);

        return response.data;
    }, {enabled: !! isAuth.sid, onSuccess: (data) => {console.log(data);setIsAuth({role_id:data?.data?.payload?.role_id})}});
    return querySession;
}