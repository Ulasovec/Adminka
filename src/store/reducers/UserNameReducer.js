import  {useReducer} from 'react';

const useUserNameReducer = () => {
    const [users,setUsersName] = useReducer((users, action) => ({...users, ...action}),
        {})
    return {users, setUsersName}
};

export default useUserNameReducer;