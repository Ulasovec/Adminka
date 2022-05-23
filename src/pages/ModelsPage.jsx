import React from 'react';
import {Link, Outlet} from "react-router-dom";

const ModelsPage = ({title = "Models"}) => {
    return (
        <div>
            <h1>{title}</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
                <Link to="todos">Todos</Link> |{" "}
                <Link to="users">Users</Link> |{" "}
                <Link to="posts">Posts</Link>
            </nav>
            <Outlet/>
        </div>
    );
};

export default ModelsPage;