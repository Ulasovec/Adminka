import  {useReducer} from 'react';

const useIsAuthReducer = () => {
    const [isAuth,setIsAuth] = useReducer((isAuth, action) => ({...isAuth, ...action}),
        {sid: '', role_id: ''})
    return {isAuth, setIsAuth}
};

export default useIsAuthReducer;