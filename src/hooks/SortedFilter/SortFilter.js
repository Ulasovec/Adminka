import {useMemo} from "react";


export const useSorted = (list, sortBy) => {

    const sortedList = useMemo(
        () => sortBy
            ? [...list].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
            : list,
        [sortBy, list]
    );
    return sortedList;
}

export const useSortedAndFilteredList = (list, sortBy, query) => {
    const sortedList = useSorted(list, sortBy);
    const sortedAndFilteredList = useMemo(
        () => sortBy
            ?sortedList.filter(item => item[sortBy].toLowerCase().includes(query.toLowerCase()))
            :sortedList,
        [query, sortedList]
    );
    return sortedAndFilteredList;
}