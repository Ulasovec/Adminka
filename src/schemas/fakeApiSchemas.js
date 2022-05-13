const todosSchema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        id: {type: "integer", title: "ID"},
        userId: {type: "integer", title: "User ID"},
        title: {type: "string", title: "Задача", default: "Надо что-то сделать"},
        completed: {type: "boolean", title: "Завершена?", default: false},
    }
};

const todosUiSchema = {
};

//------------------------

const usersSchema = {
    title: "User",
    type: "object",
    required: ["username"],
    properties: {
        id: {type: "integer", title: "ID"},
        name: {type: "string", title: "ФИО"},
        username: {type: "string", title: "Nick Name"},
        email: {type: "string", title: "E-Mail", format: "email"},
        address: {
            type: "object",
            title: "Адрес",
            properties: {
                street: {type: "string", title: "Улица"},
                suite: {type: "string", title: "Ряд"},
                city: {type: "string", title: "Город"},
                zipcode: {type: "string", title: "Индекс"},
                geo: {
                    type: "object",
                    title: "Гео",
                    properties: {
                        lat: {type: "string", title: "Широта"},
                        lng: {type: "string", title: "Долгота"}
                    }
                }
            },
        },
        phone: {type: "string", title: "Телефон"},
        website: {type: "string", title: "Сайт"},
        company: {
            type: "object",
            title: "Компания",
            properties: {
                name: {type: "string", title: "CompanyName"},
                catchPhrase: {type: "string", title: "Moto"},
                bs: {type: "string", title: "BS"}
            }
        }
    },
};

const usersUiSchema = {
};

export {todosSchema, todosUiSchema, usersSchema, usersUiSchema}
