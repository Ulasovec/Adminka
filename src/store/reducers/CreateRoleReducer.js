import  {useReducer} from 'react';

const useRolesNameReducer = () => {
    const [roles,setRolesName] = useReducer((roles, action) => ({...roles, ...action}),
        {name:"",description:"",users:0, id:1})
    return {roles, setRolesName}
};

export default useRolesNameReducer;