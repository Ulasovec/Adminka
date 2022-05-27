import React from 'react';
import {useParams} from "react-router-dom";
import {getSchema, getUiSchema, todosSchema, todosUiSchema} from "../schemas/FakeApiSchemas";
import {SchemaUtils} from "../schemas/SchemaUtils";

const ModelPage = () => {
    const {modelName} = useParams();
    const schema = SchemaUtils.getModelSchema(modelName.toLowerCase());
    //const uiSchema = getUiSchema(modelName);

    if (!schema) return <div>Sorry... Model <strong>{modelName}</strong> is unavailable!</div>

    return (
        <div>
            <h2 style={{padding: "10px 0"}}>Model name: <strong>{modelName}</strong></h2>

            <div>
                {JSON.stringify(schema)}
            </div>
        </div>
    );
};

export default ModelPage;