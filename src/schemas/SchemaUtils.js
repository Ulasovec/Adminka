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

    static #EMPTY_SCHEMA = '{"type": "object", "required": [], "properties": {}}';

    static getEmptySchema() {
        return JSON.parse(SchemaUtils.#EMPTY_SCHEMA);
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
                    rowId: index,
                    name: propKey,
                    title: subSchema.title ?? '',
                    type: subSchema.type,
                    componentRef: JSON.stringify(propValue),
                    isRequired: rootSchema.required ? rootSchema.required.some((field => field === propKey)) : false,
                    format: subSchema.format,
                    minimum: subSchema.minimum,
                    maximum: subSchema.maximum
                }
            );
        });
        return modelData;
    }

    static ModelDataToSchema(modelData) {
        const schema = SchemaUtils.getEmptySchema();
        modelData.forEach(({name, type, title, isRequired, minimum, maximum, format, componentRef}) => {
            switch (type) {
                case 'boolean':
                    schema.properties[name] = {type, title};
                    break;
                case 'string':
                    schema.properties[name] = {type, title, format};
                    break;
                case 'number':
                case 'integer':
                    schema.properties[name] = {type, title, minimum, maximum};
                    break;
                case 'object':
                    schema.properties[name] = JSON.parse(componentRef);
                    break;
                default:
                    schema.properties[name] = {type, title};
                    break;
            }
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
        return this.models.find(model => model.modelName === modelName)?.modelSchema;
    }

    addModelSchema({modelName, modelType, modelSchema = SchemaUtils.getEmptySchema()}) {
        // Title скрывает имя поля в случае объектов //
        if (!modelSchema.title) modelSchema.title = modelName;
        if (!this.models.find(model => model.modelName === modelName))
            this.models = [...this.models, {modelName, modelType, modelSchema}];
        console.log('All Models: ', this.models);
    }

    deleteModelSchema(modelName) {
        this.models = this.models.filter(model => model.modelName !== modelName);
    }

    updateModelSchema({modelName, modelType, modelSchema}) {
        // Title скрывает имя поля в случае объектов //
        if (!modelSchema.title) modelSchema.title = modelName;
        this.models = this.models.map(model =>
            model.modelName === modelName ? {modelName, modelType, modelSchema} : model
        );
        console.log({modelName, modelType, modelSchema})
    }
}

const schemaUtilsDB = new SchemaUtils();

export {SchemaUtils, schemaUtilsDB}