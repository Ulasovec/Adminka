import React from 'react';
import {useParams} from "react-router-dom";
import {getSchema, getUiSchema, todosSchema, todosUiSchema} from "../schemas/FakeApiSchemas";
import {SchemaUtils} from "../schemas/SchemaUtils";
import GenericPageContent from "../components/Content/GenericPageContent";
import {testDataArray1, testSchema1, testUiSchema1} from "../schemas/TestDataAndSchemas";
import {modelTemplateSchema} from "../schemas/ModelTemplateSchema";

const ModelPage = () => {
    const {modelName} = useParams();
    const schema = SchemaUtils.getModelSchema(modelName.toLowerCase());
    //const uiSchema = getUiSchema(modelName);

    if (!schema) return <div>Sorry... Model <strong>{modelName}</strong> is unavailable!</div>

    const modelData = SchemaUtils.schemaToModelData(schema);
    console.log('Model Data: ', modelData);

    return (
        <div>
            <h2 style={{padding: "10px 0"}}>Model name: <strong>{modelName}</strong></h2>

            <div>
                {JSON.stringify(schema)}
            </div>
            <hr/>
            <div>
                {JSON.stringify(modelData)}
            </div>
            <hr/>
            <h2>Static data</h2>
            <GenericPageContent
                dataArray={modelData}
                schema={modelTemplateSchema}
                uiSchema={{}}
            />
        </div>
    );
};

export default ModelPage;