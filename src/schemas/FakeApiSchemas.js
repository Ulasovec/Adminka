/**
 * Json-schemas для данных Fake API - https://jsonplaceholder.typicode.com/
 */

// Todos
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

const todosUiSchema = {};

// Users - дереференсный вариант
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

// Users - вариант со ссылками, начиная с самого корня
const usersSchema1 = {
    "$ref": "#/definitions/User",
    "definitions": {
        "User": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "id": {
                    "type": "integer",
                    "title": "ID"
                },
                "name": {
                    "type": "string",
                    "title": "ФИО"
                },
                "username": {
                    "type": "string",
                    "title": "Nickname"
                },
                "email": {
                    "type": "string",
                    "format": "email"
                },
                "address": {
                    "$ref": "#/definitions/Address"
                },
                "phone": {
                    "type": "string",
                    "title": "Телефон"
                },
                "website": {
                    "type": "string"
                },
                "company": {
                    "$ref": "#/definitions/Company"
                }
            },
            "required": [
                "name",
                "username",
                "email"
            ],
            "title": "Пользователь"
        },
        "Address": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "street": {
                    "type": "string"
                },
                "suite": {
                    "type": "string"
                },
                "city": {
                    "type": "string"
                },
                "zipcode": {
                    "type": "string"
                },
                "geo": {
                    "$ref": "#/definitions/Geo"
                }
            },
            "required": [
                "city"
            ],
            "title": "Адрес"
        },
        "Geo": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "lat": {
                    "type": "string"
                },
                "lng": {
                    "type": "string"
                }
            },
            "required": [],
            "title": "Geo"
        },
        "Company": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "name": {
                    "type": "string"
                },
                "catchPhrase": {
                    "type": "string"
                },
                "bs": {
                    "type": "string"
                }
            },
            "required": [],
            "title": "Company"
        }
    }
}

// Users - вариант, где только корень дереференсный
const usersSchema2 = {
    "type": "object",
    "title": "Users",
    "additionalProperties": false,
    "properties": {
        "id": {
            "type": "integer"
        },
        "name": {
            "type": "string"
        },
        "username": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "address": {
            "$ref": "#/definitions/Address"
        },
        "phone": {
            "type": "string"
        },
        "website": {
            "type": "string"
        },
        "company": {
            "$ref": "#/definitions/Company"
        }
    },
    "required": [
        "address",
        "company",
        "email",
        "id",
        "name",
        "phone",
        "username",
        "website"
    ],
    "definitions": {
        "User": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "address": {
                    "$ref": "#/definitions/Address"
                },
                "phone": {
                    "type": "string"
                },
                "website": {
                    "type": "string"
                },
                "company": {
                    "$ref": "#/definitions/Company"
                }
            },
            "required": [
                "address",
                "company",
                "email",
                "id",
                "name",
                "phone",
                "username",
                "website"
            ],
            "title": "Welcome4"
        },
        "Address": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "street": {
                    "type": "string"
                },
                "suite": {
                    "type": "string"
                },
                "city": {
                    "type": "string"
                },
                "zipcode": {
                    "type": "string"
                },
                "geo": {
                    "$ref": "#/definitions/Geo"
                }
            },
            "required": [
                "city",
                "geo",
                "street",
                "suite",
                "zipcode"
            ],
            "title": "Address"
        },
        "Geo": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "lat": {
                    "type": "string"
                },
                "lng": {
                    "type": "string"
                }
            },
            "required": [
                "lat",
                "lng"
            ],
            "title": "Geo"
        },
        "Company": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "name": {
                    "type": "string"
                },
                "catchPhrase": {
                    "type": "string"
                },
                "bs": {
                    "type": "string"
                }
            },
            "required": [
                "bs",
                "catchPhrase",
                "name"
            ],
            "title": "Company"
        }
    }
}

const usersUiSchema = {};

// -----------------------------------------------------
const addressCardsSchema = {
    "definitions": {
        "address": {
            "type": "object",
            "properties": {
                "street_address": {"type": "string"},
                "city": {"type": "string"},
                "state": {"type": "string"}
            },
            "required": ["street_address", "city", "state"]
        }
    },
    "type": "object",
    "title": "AddressCard",
    "properties": {
        "billing_address": {"$ref": "#/definitions/address"},
        "shipping_address": {"$ref": "#/definitions/address"}
    }
};

//---------------------------------------
function getSchema(name) {
    if (name === 'todos') return todosSchema
    else if (name === 'users') return usersSchema1
    else return undefined;
}

function getUiSchema(name) {
    if (name === 'todos') return todosUiSchema
    else if (name === 'users') return usersUiSchema
    else return {};
}


export {
    todosSchema,
    todosUiSchema,
    usersSchema,
    usersSchema1,
    usersSchema2,
    usersUiSchema,
    addressCardsSchema,
    getSchema,
    getUiSchema
}
