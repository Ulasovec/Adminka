import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";

const ModelsPage = ({title = "Models"}) => {

    const setActiveStyle = ({isActive}) => {
        return {
            color: isActive ? "red" : "",
        };
    }

    return (
        <div>
            <h1>{title}</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
                <NavLink style={setActiveStyle} to="todos">Todos</NavLink> |{" "}
                <NavLink style={setActiveStyle} to="users">Users</NavLink> |{" "}
                <NavLink style={setActiveStyle} to="posts">Posts</NavLink>
            </nav>
            <Outlet/>
        </div>
    );
};

export default ModelsPage;