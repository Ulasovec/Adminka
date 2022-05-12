/**
 * Демонстрация CRUD массива объектов с произвольными полями
 * с использованием описания объекта списка в виде json-schema.
 * !!! Предполагается, что поля объекта не содержат другие объекты и массивы.
 */
import React from 'react';
import {Container} from "react-bootstrap";
import {Toaster} from "react-hot-toast";
import GenericPageContent from "../components/Content/GenericPageContent";
import GenericPageRestApiWrapper from "../api/GenericPageRestApiWrapper";

const schema = {
    title: "Todo item",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        days: {type: "number", title: "How many days?", default: 1, exclusiveMinimum: 0, maximum: 10},
        finish: {type: "string", format: "date-time", title: "Finish date", default: "1970-01-01T00:00:00.000Z"},
        dimensions: {
            type: "object",
            title: "Размеры",
            properties: {
                length: {type: "number", title: "Длина"},
                width: {type: "number", title: "Ширина"},
                height: {type: "number", title: "Высота"}
            },
            required: [ "length", "width", "height" ]
        }
    }
};

const uiSchema = {
    done: {"ui:widget": "radio"},
    days: {"ui:widget": "range"}
};

const dataArray = [
    {title: "First task", done: true, days: 5, finish: "2022-05-07T18:30:00.000Z", dimensions: {length: 1, width: 2, height: 3}},
    {title: "Second task", done: false, days: 4, finish: "2022-05-08T8:45:00.000Z", dimensions: {length: 11, width: 22, height: 33}},
    {title: "Third task", done: true, days: 7, finish: "2022-05-07T18:30:00.000Z", dimensions: {length: 5, width: 6, height: 7}},
    {title: "Forth task", done: true, days: 1, finish: "2022-05-07T18:30:00.000Z", dimensions: {length: 101, width: 20, height: 30}},
    {title: "Fifth task", done: true, days: 2, finish: "2022-05-07T18:30:00.000Z", dimensions: {length: 1.1, width: 2.5, height: 3.2}},
]

const GenericPage = () => {

    return (
        <div>
            <Container>
                <GenericPageContent
                    dataArray={dataArray}
                    schema={schema}
                    uiSchema={uiSchema}
                />
                {/*<GenericPageRestApiWrapper
                    apiPath="posts"
                    schema={schema}
                    uiSchema={uiSchema}
                />*/}
            </Container>
            <Toaster/>
        </div>
    );
};

export default GenericPage;