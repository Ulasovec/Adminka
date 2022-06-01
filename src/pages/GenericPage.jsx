/**
 * Демонстрация CRUD массива объектов с произвольными полями
 * с использованием описания объекта списка в виде json-schema.
 * Встроенные под-объекты и под-массивы тоже будут обрабатываться.
 */
import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import {Toaster} from "react-hot-toast";
import GenericPageContent from "../components/Content/GenericPageContent";
import GenericPageRestApiWrapper from "../api/GenericPageRestApiWrapper";
import {
    todosSchema,
    todosUiSchema,
    usersSchema, usersSchema1, usersSchema2,
    usersUiSchema
} from "../schemas/FakeApiSchemas";
import {testDataArray1, testSchema1, testUiSchema1} from "../schemas/TestDataAndSchemas";

const GenericPage = () => {
    const [testArray, setTestArray] = useState(testDataArray1);

    return (
        <div>
            <Container>
                <h1>Demo Fake API</h1>
                <hr/>
                {/*<h2>Todos</h2>
                <GenericPageRestApiWrapper apiPath="todos">
                    <GenericPageContent
                        schema={todosSchema}
                        uiSchema={todosUiSchema}
                    />
                </GenericPageRestApiWrapper>
                <hr/>
                <h2>Users</h2>
                <GenericPageRestApiWrapper apiPath="users">
                    <GenericPageContent
                        schema={usersSchema1}
                        uiSchema={usersUiSchema}
                    />
                </GenericPageRestApiWrapper>
                <hr/>*/}
                <h2>Static data</h2>
                <GenericPageContent
                    dataArray={testArray}
                    setDataArray={setTestArray}
                    schema={testSchema1}
                    uiSchema={testUiSchema1}
                />
            </Container>
            <Toaster/>
        </div>
    );
};

export default GenericPage;