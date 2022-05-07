import React from 'react';
import Form from '@rjsf/bootstrap-4';
import {Container} from "react-bootstrap";

const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        days: {type: "number", title: "How many days?", default: 1, exclusiveMinimum: 0, maximum: 10},
        finish: {type: "string", format: "date-time", title: "Finish date"}
    }
};

const uiSchema =  {
    done: {
        "ui:widget": "radio" // could also be "select"
    },
    days: {
        "ui:widget": "range"
    }
};

const formData = {
    title: "First task",
    done: true,
    days: 5,
    finish: "2022-05-07T20:30"
};

const log = (type) => console.log.bind(console, type);

const AboutPage = () => {
    return (
        <div>
            <Container>
                <Form schema={schema}
                      uiSchema={uiSchema}
                      formData={formData}
                      onChange={log("changed")}
                      onSubmit={log("submitted")}
                      onError={log("errors")}
                />
            </Container>
        </div>
    );
};

export default AboutPage;