import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";

const ContentsSinglesPage = () => {

    const setActiveStyle = ({isActive}) => {
        return {
            color: isActive ? "red" : "",
        };
    }

    return (
        <div>
            <h1>Contents - Singles</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
                <NavLink style={setActiveStyle} to="homepage">HomePage</NavLink> |{" "}
                <NavLink style={setActiveStyle} to="mysettings">MySettings</NavLink> |{" "}
                <NavLink style={setActiveStyle} to="contacts">Contacts</NavLink>
            </nav>
            <Outlet/>
        </div>
    );
};

export default ContentsSinglesPage;