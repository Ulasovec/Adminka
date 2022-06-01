import React from 'react';
import {Link, NavLink, Outlet, useParams} from "react-router-dom";
import {SchemaUtils, schemaUtilsDB} from "../schemas/SchemaUtils";
import {Button} from "react-bootstrap";

const ModelsPage = () => {

    const allModelTypes = ['collections', 'singles', 'components'];
    const {modelsType} = useParams();

    const setActiveStyle = ({isActive}) => {
        return {
            color: isActive ? "red" : "",
        };
    }

    if (!allModelTypes.some((typeName) => modelsType === typeName))
        return <div>Sorry... Models Type <strong>{modelsType}</strong> is unavailable!</div>

    return (
        <div>
            <h1>Models - {modelsType}</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
                {schemaUtilsDB.getAllModelNames(modelsType.toLowerCase()).map(name => (
                    <React.Fragment key={name}>
                        <NavLink style={setActiveStyle} to={name}>{name}</NavLink>{' | '}
                    </React.Fragment>
                ))}
                {/*<NavLink style={setActiveStyle} to="todos">Todos</NavLink> |{" "}
                <NavLink style={setActiveStyle} to="users">Users</NavLink> |{" "}
                <NavLink style={setActiveStyle} to="posts">Posts</NavLink>*/}
                <Button variant="outline-primary" size="sm">Add model</Button>
            </nav>
            <Outlet/>
        </div>
    );
};

export default ModelsPage;