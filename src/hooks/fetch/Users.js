import {useMutation} from "react-query";
import axios from "axios";
import {useContext} from "react";
import {UserContext} from "../../store/context/UserContext";
import {api} from "../../api/axios-config";

export default function useLogin() {
    const {setIsAuth} = useContext(UserContext);

    const mutationLogin = useMutation(credentials => {
        return api.post(process.env.REACT_APP_API_URL, credentials);
    }, {
        onSuccess: (data) => {console.log(data?.data?.data); setIsAuth({sid: data?.data?.data?.sid}); }
    });
    return mutationLogin;
}