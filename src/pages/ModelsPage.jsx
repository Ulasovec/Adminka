import React from 'react';
import {Link, NavLink, Outlet, useParams, useNavigate} from "react-router-dom";
import {SchemaUtils, schemaUtilsDB} from "../schemas/SchemaUtils";
import {Button, Form} from "react-bootstrap";

const ModelsPage = () => {

    const allModelTypes = ['collections', 'singles', 'components'];
    const {modelsType} = useParams();
    const navigate = useNavigate();

    const setActiveStyle = ({isActive}) => {
        return {
            color: isActive ? "red" : "",
        };
    }

    function onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        //console.log(formDataObj);
        const newModelName = formDataObj.newModelName;
        schemaUtilsDB.addModelSchema({
            modelName: newModelName,
            modelType: modelsType,
            modelSchema: undefined
        });
        navigate(`./${newModelName}`);
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
                <Form onSubmit={onFormSubmit}>
                    <Form.Control size="sm" type="text" name="newModelName" placeholder="Enter model name..."/>
                    <Button type="submit" variant="outline-primary" size="sm">Add model</Button>
                </Form>
            </nav>
            <Outlet/>
        </div>
    );
};

export default ModelsPage;