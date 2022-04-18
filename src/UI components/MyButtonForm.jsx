import React from 'react';
import classes from "./MyButton.module.css";
const MyButtonForm = ({children, ...props}) => {
    return (

            <button {...props} type="submit" className={classes.myBtn} data-title="Add">
                {children}
            </button>

    );
};

export default MyButtonForm;