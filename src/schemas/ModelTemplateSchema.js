export const modelTemplateSchema = {
    "title": "A model's field definition form",
    "description": "You can define NAME, TITLE, TYPE and other parameters of the field.",
    "type": "object",
    "required": [
        "name",
        "type"
    ],
    "properties": {
        "id": {
            "type": "integer",
            "title": "Field's ID"
        },
        "name": {
            "type": "string",
            "title": "Field's name",
            "minLength": 1
        },
        "title": {
            "type": "string",
            "title": "Field's title"
        },
        "type": {
            "type": "string",
            "title": "Field's type",
            "enum": ["string", "number", "integer", "boolean", "object"],
            "enumNames": ["Строка", "Число", "Целое", "Бинарное", "Объект"],
        },
        "minimum": {
            "type": "integer",
            "title": "Minimum value"
        },
        "maximum": {
            "type": "integer",
            "title": "Maximum value"
        },
        "isRequired": {
            "type": "boolean",
            "title": "Is required?"
        }
    }
};

const modelDataExample = {
    "name": "id",
    "type": "integer",
    "minimum": 1,
    "title": "ID",
    "isRequired": true
};
