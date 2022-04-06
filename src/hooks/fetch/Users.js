import {useMutation} from "react-query";
import axios from "axios";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

export default function useLogin() {
    const {setSid} = useContext(UserContext);

    const mutationLogin = useMutation(credentials => {
        return axios.post(process.env.REACT_APP_API_URL, credentials);
    }, {
        onSuccess: (data) => { setSid(data?.data?.data?.sid); console.log(data?.data.data)}
    });
    return mutationLogin;
}