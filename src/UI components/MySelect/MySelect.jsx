import React from 'react';

const MySelect = ({options, defaultValue, value, onChange}) => {

    return (
        <select value={value} onChange={(event) => onChange(event.target.value)}>
            <option value = '' >{defaultValue}</option>
            {
                options.map((option,index) =>
                    <option key={index} value={option}>{option}</option>
                )
            }
        </select>
    );
};

export default MySelect;