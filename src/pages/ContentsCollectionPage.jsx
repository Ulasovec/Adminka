import React from 'react';
import {useParams} from "react-router-dom";
import GenericPageContent from "../components/Content/GenericPageContent";
import {getSchema, getUiSchema, todosSchema, todosUiSchema} from "../schemas/FakeApiSchemas";
import GenericPageRestApiWrapper from "../api/GenericPageRestApiWrapper";

const ContentsCollectionPage = () => {
    const {modelName} = useParams();
    const schema = getSchema(modelName);
    const uiSchema = getUiSchema(modelName);

    if (!schema) return <div>Sorry... Model <strong>{modelName}</strong> is unavailable!</div>

    return (
        <div>
            <h2 style={{padding: "10px 0"}}>Collection model name: <strong>{modelName}</strong></h2>

            <GenericPageRestApiWrapper apiPath={modelName}>
                <GenericPageContent
                    schema={schema}
                    uiSchema={uiSchema}
                />
            </GenericPageRestApiWrapper>
        </div>
    );
};

export default ContentsCollectionPage;