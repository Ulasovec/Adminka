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

    static dereferenceSchema(subSchema, rootSchema) {
        return subSchema['$ref']
            ? subSchema['$ref'].split('/').slice(1).reduce((p, field) => p[field], rootSchema)
            : subSchema
    }

    static schemaToModelData(schema) {
        const rootSchema = this.dereferenceSchema(schema, schema);
        const modelData = Object.entries(rootSchema.properties).map(([propKey, propValue], index) => {
            const subSchema = this.dereferenceSchema(propValue, schema);
            return (
                {
                    id: index,
                    name: propKey,
                    title: subSchema.title ?? '',
                    type: subSchema.type,
                    isRequired: rootSchema.required ? rootSchema.required.some((field => field === propKey)) : false,
                    minimum: subSchema.minimum,
                    maximum: subSchema.maximum
                }
            );
        });
        return modelData;
    }
}

export {SchemaUtils}