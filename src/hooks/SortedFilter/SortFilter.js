import {useMemo} from "react";


export const useSorted = (list, sortBy, order = 'asc') => {

    const orderNum = order === 'asc' ? 1 : -1

    const sortedList = useMemo(
        () => sortBy && list.length
            ? (typeof list[0][sortBy] === 'string')
                ? [...list].sort((a, b) => a[sortBy].localeCompare(b[sortBy]) * orderNum)
                : (typeof list[0][sortBy] === 'number')
                    ? [...list].sort((a, b) => (a[sortBy] - b[sortBy]) * orderNum)
                    : (typeof list[0][sortBy] === 'boolean')
                        ? [...list].sort((a, b) => ((a[sortBy] === b[sortBy]) ? 0 : a[sortBy] ? -1 : 1) * orderNum)
                        : list

            : list,
        [sortBy, list, order]
    );

    /*const sortedList = useMemo(
        () => sortBy
            ? [...list].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
            : list,
        [sortBy, list]
    );*/

    return sortedList;
}

export const useSortedAndFilteredList = (list, sortBy, query, order = 'asc') => {
    const sortedList = useSorted(list, sortBy, order);
    const sortedAndFilteredList = useMemo(
        () => sortBy && sortedList.length && typeof sortedList[0][sortBy] !== 'undefined'
            ? sortedList.filter(item => item[sortBy].toString().toLowerCase().includes(query.toLowerCase()))
            : sortedList,
        [query, sortedList]
    );
    return sortedAndFilteredList;
}


/*
(typeof list[0][sortBy] === 'string')
    ? [...list].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
    : (typeof list[0][sortBy] === 'number')
        ? [...list].sort((a, b) => a[sortBy] - b[sortBy])
        : (typeof list[0][sortBy] === 'boolean')
            ? [...list].sort((a, b) => !a[sortBy] && b[sortBy])
            : list
*/
