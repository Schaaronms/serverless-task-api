const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const dynamo = require("../lib/dynamo");
const response = require("../lib/response");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const item = {
      userId: body.userId,
      taskId: body.taskId,
      title: body.title,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await dynamo.send(
      new PutCommand({
        TableName: "tasks",
        Item: item
      })
    );

    return response(201, {
      message: "Task created",
      task: item
    });
  } catch (error) {
    console.error(error);

    return response(500, {
      message: "Internal Server Error"
    });
  }
};
