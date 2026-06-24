const { UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../lib/dynamo');
const { response } = require('../lib/response');

exports.handler = async (event) => {
  try {
    const userId = event.headers?.['x-user-id'] || 'anonymous';
    const { taskId } = event.pathParameters || {};
    const body = JSON.parse(event.body || '{}');

    if (!taskId) {
      return response(400, { message: 'taskId is required' });
    }

    const updates = {};
    if (body.title !== undefined) updates.title = body.title;
    if (body.status !== undefined) updates.status = body.status;

    if (Object.keys(updates).length === 0) {
      return response(400, { message: 'at least one field (title, status) is required' });
    }

    const now = new Date().toISOString();
    const expressionParts = Object.keys(updates).map((k) => `#${k} = :${k}`);
    expressionParts.push('updatedAt = :updatedAt');

    const result = await docClient.send(new UpdateCommand({
      TableName: process.env.TABLE_NAME,
      Key: { userId, taskId },
      UpdateExpression: `SET ${expressionParts.join(', ')}`,
      ExpressionAttributeNames: Object.fromEntries(
        Object.keys(updates).map((k) => [`#${k}`, k])
      ),
      ExpressionAttributeValues: {
        ...Object.fromEntries(Object.keys(updates).map((k) => [`:${k}`, updates[k]])),
        ':updatedAt': now,
      },
      ConditionExpression: 'attribute_exists(taskId)',
      ReturnValues: 'ALL_NEW',
    }));

    return response(200, result.Attributes);
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      return response(404, { message: 'Task not found' });
    }
    console.error(err);
    return response(500, { message: 'Internal server error' });
  }
};
