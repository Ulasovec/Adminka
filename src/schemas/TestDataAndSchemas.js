const testSchema1 = {
    title: "Todo item",
    type: "object",
    required: ["title"],
    properties: {
        id: {type: "number", title: "ID"},
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
            required: ["length", "width", "height"]
        }
    }
};

const testUiSchema1 = {
    done: {"ui:widget": "radio"},
    days: {"ui:widget": "range"}
};

const testDataArray1 = [
    {
        id: 1,
        title: "First task",
        done: true,
        days: 5,
        finish: "2022-05-07T18:30:00.000Z",
        dimensions: {length: 1, width: 2, height: 3}
    },
    {
        id: 2,
        title: "Second task",
        done: false,
        days: 4,
        finish: "2022-05-08T8:45:00.000Z",
        dimensions: {length: 11, width: 22, height: 33}
    },
    {
        id: 3,
        title: "Third task",
        done: true,
        days: 7,
        finish: "2022-05-07T18:30:00.000Z",
        dimensions: {length: 5, width: 6, height: 7}
    },
    {
        id: 4,
        title: "Forth task",
        done: true,
        days: 1,
        finish: "2022-05-07T18:30:00.000Z",
        dimensions: {length: 101, width: 20, height: 30}
    },
    {
        id: 5,
        title: "Fifth task",
        done: true,
        days: 2,
        finish: "2022-05-07T18:30:00.000Z",
        dimensions: {length: 1.1, width: 2.5, height: 3.2}
    },
];

//---------------------------------------

const homepageSchema = {
    title: "Home Page",
    type: "object",
    required: ["title"],
    properties: {
        id: {type: "number", title: "Single ID"},
        title: {type: "string", title: "Название", default: "Домашняя страница"},
        description: {type: "string", title: "Описание", default: "Здесь описание страницы"},
    }
};

const homepageUiSchema = {};

const homepageData = {
    id: 1,
    title: "My Home Page",
    description: "Here is description"
}


//---------------------------------------

function getSingleSchema(name) {
    if (name === 'homepage') return homepageSchema
    else return undefined;
}

function getSingleUiSchema(name) {
    if (name === 'homepage') return homepageUiSchema
    else return {};
}

function getSingleData(name) {
    if (name === 'homepage') return homepageData
    else return undefined
}

export {
    testSchema1, testUiSchema1, testDataArray1, homepageData,
    getSingleSchema, getSingleUiSchema, getSingleData
}
