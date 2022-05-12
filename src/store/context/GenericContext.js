import {createContext, useContext} from "react";

const GenericContext = createContext(undefined);

function GenericProvider({children, value}) {
    return (
        <GenericContext.Provider value={value}>{children}</GenericContext.Provider>
    );
}

function useGenericContext() {
    const context = useContext(GenericContext);
    /*if (context === undefined) {
        throw new Error("useGenericContext must be used within a GenericProvider");
    }*/
    return context;
}

export {GenericProvider, useGenericContext}
