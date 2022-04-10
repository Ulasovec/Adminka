import  {useReducer} from 'react';

const useCheckedReducer = () => {
    const [checkId,setCheckId] = useReducer((checkId, action) => ({...checkId, ...action}),
        {})
    return {checkId,setCheckId}
};

export default useCheckedReducer;