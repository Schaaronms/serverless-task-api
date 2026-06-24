const { GetCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../lib/dynamo');
const { response } = require('../lib/response');

exports.handler = async (event) => {
  try {
    const userId = event.headers?.['x-user-id'] || 'anonymous';
    const { taskId } = event.pathParameters || {};

    if (!taskId) {
      return response(400, { message: 'taskId is required' });
    }

    const result = await docClient.send(new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: { userId, taskId },
    }));

    if (!result.Item) {
      return response(404, { message: 'Task not found' });
    }

    return response(200, result.Item);
  } catch (err) {
    console.error(err);
    return response(500, { message: 'Internal server error' });
  }
};
