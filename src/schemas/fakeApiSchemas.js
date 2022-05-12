const postsSchema = {
    title: "Post",
    type: "object",
    required: [
        "title",
        /*"categoryId",
        "content",
        "hits",
        "id",
        "imageUrl",
        "likes",
        "userId"*/
    ],
    properties: {
        id: {
            type: "integer"
        },
        title: {
            type: "string",
            title: "Заголовок"
        },
        userId: {
            type: "integer"
        },
        content: {
            type: "string",
            title: "Содержимое"
        },
        likes: {
            type: "integer"
        },
        hits: {
            type: "integer"
        },
        categoryId: {
            type: "integer"
        },
        imageUrl: {
            type: "string",
            format: "uri"
        }
    }
};

const postsUiSchema = {
    likes: {"ui:widget": "range"}
};

export {postsSchema, postsUiSchema}
