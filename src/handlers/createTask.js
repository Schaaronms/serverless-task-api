const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../lib/dynamo');
const { response } = require('../lib/response');

exports.handler = async (event) => {
  try {
    const userId = event.headers?.['x-user-id'] || 'anonymous';
    const body = JSON.parse(event.body || '{}');

    if (!body.title) {
      return response(400, { message: 'title is required' });
    }

    const now = new Date().toISOString();
    const item = {
      userId,
      taskId: crypto.randomUUID(),
      title: body.title,
      status: body.status || 'pending',
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: item,
    }));

    return response(201, item);
  } catch (err) {
    console.error(err);
    return response(500, { message: 'Internal server error' });
  }
};
