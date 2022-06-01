import React from 'react';
import {useParams} from "react-router-dom";
import GenericPageContent from "../components/Content/GenericPageContent";
import {getSchema, getUiSchema, todosSchema, todosUiSchema} from "../schemas/FakeApiSchemas";
import GenericPageRestApiWrapper from "../api/GenericPageRestApiWrapper";
import {getSingleData, getSingleSchema, getSingleUiSchema} from "../schemas/TestDataAndSchemas";
import {Button} from "react-bootstrap";
import Form from "@rjsf/bootstrap-4";

const ContentsSinglePage = () => {
    const {modelName} = useParams();
    const schema = getSingleSchema(modelName);
    const uiSchema = getSingleUiSchema(modelName);
    const data = getSingleData(modelName);

    function handleSubmit(newData) {
        console.log('Sumbited data: ', newData);
    }

    if (!schema) return <div>Sorry... Model <strong>{modelName}</strong> is unavailable!</div>

    return (
        <div>
            <h2 style={{padding: "10px 0"}}>Single model name: <strong>{modelName}</strong></h2>

            <div style={{backgroundColor: "#eee", padding: '10px'}}>
                <Form schema={schema}
                      uiSchema={uiSchema}
                      formData={data}
                      onChange={e => console.log('Changed :', e.formData)}
                      onSubmit={e => handleSubmit(e.formData)}
                      onError={errors => console.log('Error :', errors)}
                >
                    <Button type="submit" variant="primary" className="mt-3">
                        Done
                    </Button>
                </Form>
            </div>

        </div>
    );
};

export default ContentsSinglePage;