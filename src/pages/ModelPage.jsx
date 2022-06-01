import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import {getSchema, getUiSchema, todosSchema, todosUiSchema} from "../schemas/FakeApiSchemas";
import {SchemaUtils, schemaUtilsDB} from "../schemas/SchemaUtils";
import GenericPageContent from "../components/Content/GenericPageContent";
import {testDataArray1, testSchema1, testUiSchema1} from "../schemas/TestDataAndSchemas";
import {modelTemplateSchema} from "../schemas/ModelTemplateSchema";
import {Button} from "react-bootstrap";

const ModelPage = () => {
    const {modelName, modelsType: modelType} = useParams();
    const schema = useMemo(() => schemaUtilsDB.getModelSchema(modelName.toLowerCase()), [modelName]);
    const initModelData = useMemo(() => SchemaUtils.schemaToModelData(schema), [modelName]);
    const [modelData, setModelData] = useState(initModelData);
    useEffect(() => setModelData(initModelData), [modelName]);

    function handleUpdateModelData() {
        const modelSchema = SchemaUtils.ModelDataToSchema(modelData);
        schemaUtilsDB.updateModelSchema({modelName, modelType, modelSchema});
    }

    if (!schema) return <div>Sorry... Model <strong>{modelName}</strong> is unavailable!</div>

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
                setDataArray={setModelData}
                schema={modelTemplateSchema}
                uiSchema={{}}
            />
            <hr/>
            <Button onClick={handleUpdateModelData}>Update schema</Button>
        </div>
    );
};

export default ModelPage;