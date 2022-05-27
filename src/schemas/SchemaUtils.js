import {getSchema} from "./FakeApiSchemas";
import {getComponentSchema, getSingleSchema} from "./TestDataAndSchemas";

class SchemaUtils {
    static #modelLinks = {
        todos: getSchema,
        users: getSchema,
        posts: getSchema,
        homepage: getSingleSchema,
        mysettings: getSingleSchema,
        contacts: getSingleSchema,
        myaddress: getComponentSchema,
        mycompany: getComponentSchema,
        mygeo: getComponentSchema
    }

    static getAllModelNames(modelType) {
        if (modelType === 'collections') return ['todos', 'users', 'posts'];
        else if (modelType === 'singles') return ['homepage', 'mysettings', 'contacts'];
        else if (modelType === 'components') return ['myaddress', 'mycompany', 'mygeo'];
        else return [];
    }

    static getModelSchema(modelName) {
        if (this.#modelLinks[modelName]) return this.#modelLinks[modelName](modelName);
        else return undefined;
    }
}

export {SchemaUtils}