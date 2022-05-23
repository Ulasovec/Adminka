import React from 'react';
import {useParams} from "react-router-dom";

const CollectionIdPage = () => {

    const params = useParams();
    return (
        <div>
            <h1>Content - Collection: <strong>{params.modelName}</strong> - Id: {params.id}</h1>
        </div>
    );
};

export default CollectionIdPage;