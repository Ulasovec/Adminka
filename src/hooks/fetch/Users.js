import {useMutation} from "react-query";
import axios from "axios";


export default function  useLogin(){

    const mutationRegister = useMutation(credentials => {
        return axios.post('http://176.9.99.18:8090/', credentials,  );
    },{onSuccess:(data) => console.log(data)});
    return mutationRegister;
}