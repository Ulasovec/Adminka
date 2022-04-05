import {useMutation} from "react-query";
import axios from "axios";

export default function useLogin() {

    const mutationLogin = useMutation(credentials => {
        return axios.post(process.env.REACT_APP_API_URL, credentials);
    }, {
        onSuccess: (data) => console.log('RESPONSE: ', data)
    });
    return mutationLogin;
}