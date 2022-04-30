import React from 'react';
import './SearchSortForm.css';
import MySelect from "../../UI components/MySelect/MySelect";
import MyInput from "../../UI components/MyInput/MyInput";
import PropTypes from "prop-types";


const SearchSortForm = ({filter, setFilter, itemList}) => {

    const optionKey = Object.keys((itemList.length === 0) ? [] : itemList[0]);
    const options = optionKey.filter(item => item !== 'is_active' && item !== 'create_ts' && item !== 'update_ts')
    console.log(filter)
    return (
        <div className="searchSortForm">
            <MySelect
                value={filter.sortBy}
                onChange={newSortBy => setFilter({...filter, sortBy: newSortBy})}
                defaultValue="Without sorting"
                options={options}
            />
            {(filter.sortBy === '')
                ? null
                :
                <MyInput
                    value={filter.query}
                    onChange={(e) => setFilter({...filter, query: e.target.value})}
                    placeholder="Search..."

                />
            }
        </div>
    );
};

export default SearchSortForm;

SearchSortForm.propTypes = {
    /**
     * itemList(Приходит массив обьектов, достаём обьект у обьекта ключи)
     * setFilter(Функция для изменеия состояния)
     * filter(обьект {sortBy: '', query: ''} для сортировки и фильтрации)
     */
    itemList: PropTypes.array,
    setFilter: PropTypes.func,
    filter: PropTypes.object,
}