const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE || 'UsersTable';

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    if (!body.email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
    }

    const userId = uuidv4();
    const item = {
      userId,
      email: body.email,
      name: body.name || '',
      createdAt: new Date().toISOString()
    };

    await dynamo.put({
      TableName: USERS_TABLE,
      Item: item
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User registered successfully', userId })
    };

  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
