const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const dynamo = require("../lib/dynamo");
const response = require("../lib/response");

exports.handler = async (event) => {
  try {
    const userId = event.userId;

    const result = await dynamo.send(
      new QueryCommand({
        TableName: "tasks",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId
        }
      })
    );

    return response(200, result.Items);
  } catch (error) {
    console.error(error);

    return response(500, {
      message: "Internal Server Error"
    });
  }
};
