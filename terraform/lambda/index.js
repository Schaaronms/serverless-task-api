exports.handler = async (event) => {
    const path = event.requestContext?.http?.path;
    const method = event.requestContext?.http?.method;

    if (method === "GET" && path === "/tasks") {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "rota GET /tasks funcionando"
            })
        };
    }

    return {
        statusCode: 404,
        body: JSON.stringify({
            message: "Route not found"
        })
    };
};
