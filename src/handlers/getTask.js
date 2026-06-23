const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const dynamo = require("../lib/dynamo");
const response = require("../lib/response");

exports.handler = async (event) => {
  try {
    const result = await dynamo.send(
      new GetCommand({
        TableName: "tasks",
        Key: {
          userId: event.userId,
          taskId: event.taskId
        }
      })
    );

    if (!result.Item) {
      return response(404, {
        message: "Task not found"
      });
    }

    return response(200, result.Item);
  } catch (error) {
    console.error(error);

    return response(500, {
      message: "Internal Server Error"
    });
  }
};
