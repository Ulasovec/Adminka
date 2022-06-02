import {homepageData, mysettingsData} from "../../schemas/TestDataAndSchemas";

class LocalDataUtils {
    constructor() {
        this.collections = {};
        this.singles = {
            homepage: homepageData,
            mysettings: mysettingsData
        };
    }

    getSingleData(modelName) {
        return this.singles[modelName];
    }

    setSingleData(modelName, data) {
        this.singles[modelName] = data;
    }
}

const localDataUtilsDB = new LocalDataUtils();

export {LocalDataUtils, localDataUtilsDB};