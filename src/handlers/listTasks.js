const { QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../lib/dynamo');
const { response } = require('../lib/response');

exports.handler = async (event) => {
  try {
    const userId = event.headers?.['x-user-id'] || 'anonymous';

    const result = await docClient.send(new QueryCommand({
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId },
    }));

    return response(200, { tasks: result.Items });
  } catch (err) {
    console.error(err);
    return response(500, { message: 'Internal server error' });
  }
};
