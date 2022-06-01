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
        if (!schema) return undefined;
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

    static ModelDataToSchema(modelData) {
        const schema = {type: 'object', required: [], properties: {}};
        modelData.forEach(({name, type, title, isRequired, minimum, maximum}) => {
            schema.properties[name] = {type, title, minimum, maximum};
            if (isRequired) schema.required.push(name);
        });
        return schema;
    }

    constructor() {
        this.models = [
            {modelName: 'todos', modelType: 'collections', modelSchema: getSchema('todos')},
            {modelName: 'users', modelType: 'collections', modelSchema: getSchema('users')},
            {modelName: 'posts', modelType: 'collections', modelSchema: getSchema('posts')},
            {modelName: 'homepage', modelType: 'singles', modelSchema: getSingleSchema('homepage')},
            {modelName: 'mysettings', modelType: 'singles', modelSchema: getSingleSchema('mysettings')},
            {modelName: 'contacts', modelType: 'singles', modelSchema: getSingleSchema('contacts')},
            {modelName: 'myaddress', modelType: 'components', modelSchema: getComponentSchema('myaddress')},
            {modelName: 'mycompany', modelType: 'components', modelSchema: getComponentSchema('mycompany')},
            {modelName: 'mygeo', modelType: 'components', modelSchema: getComponentSchema('mygeo')},
        ];
    }

    getAllModelNames(modelType) {
        return this.models
            .filter(model => !modelType || model.modelType === modelType)
            .map(model => model.modelName);
    }

    getModelSchema(modelName) {
        return this.models.find(model => model.modelName === modelName).modelSchema;
    }

    addModelSchema({modelName, modelType, modelSchema}) {
        if (!this.models.find(model => model.modelName === modelName))
            this.models = [...this.models, {modelName, modelType, modelSchema}];
    }

    deleteModelSchema(modelName) {
        this.models = this.models.filter(model => model.modelName !== modelName);
    }

    updateModelSchema({modelName, modelType, modelSchema}) {
        this.models = this.models.map(model =>
            model.modelName === modelName ? {modelName, modelType, modelSchema} : model
        );
        console.log({modelName, modelType, modelSchema})
    }
}

const schemaUtilsDB = new SchemaUtils();

export {SchemaUtils, schemaUtilsDB}