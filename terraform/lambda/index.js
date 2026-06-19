exports.handler = async (event) => {
    console.log("Evento recebido:", JSON.stringify(event));

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Serverless Task API",
            environment: process.env.NODE_ENV || "dev",
            timestamp: new Date().toISOString()
        })
    };
};
