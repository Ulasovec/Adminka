import {useMutation} from "react-query";
import {useContext} from "react";
import {UserContext} from "../../store/context/UserContext";
import {api} from "../../api/axios-config";

export default function useLogin() {
    const {setIsAuth} = useContext(UserContext);
    //const queryClient = useQueryClient();

    const mutationLogin = useMutation(credentials => {
        const body = {
            method: "api_acl_sign_in_login_password",
            data: {
                // login: "test_admin001@test.domain",
                // password: "password",
                login: credentials.login,
                password: credentials.password,
                app_id: "b7177966-2735-4411-9ae7-acff92762510",
                timeout: 10000.0
            }
        }
        return api.post(process.env.REACT_APP_API_URL, body);
    }, {
        onSuccess: (response) => {
            setIsAuth({sid: response?.data?.data?.sid});
            // queryClient.invalidateQueries('acl_user_find'); //may be some invalidates
        }
    });
    return mutationLogin;
}