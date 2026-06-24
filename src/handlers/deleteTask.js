const { DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../lib/dynamo');
const { response } = require('../lib/response');

exports.handler = async (event) => {
  try {
    const userId = event.headers?.['x-user-id'] || 'anonymous';
    const { taskId } = event.pathParameters || {};

    if (!taskId) {
      return response(400, { message: 'taskId is required' });
    }

    await docClient.send(new DeleteCommand({
      TableName: process.env.TABLE_NAME,
      Key: { userId, taskId },
      ConditionExpression: 'attribute_exists(taskId)',
    }));

    return response(204, null);
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      return response(404, { message: 'Task not found' });
    }
    console.error(err);
    return response(500, { message: 'Internal server error' });
  }
};
