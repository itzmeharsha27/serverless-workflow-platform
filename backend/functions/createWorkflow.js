const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();

const WORKFLOWS_TABLE = process.env.WORKFLOWS_TABLE || 'WorkflowsTable';

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    if (!body.userId || !body.triggerType) {
      return { statusCode: 400, body: JSON.stringify({ error: 'userId and triggerType are required' }) };
    }

    const workflowId = uuidv4();
    const item = {
      workflowId,
      userId: body.userId,
      triggerType: body.triggerType,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await dynamo.put({
      TableName: WORKFLOWS_TABLE,
      Item: item
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Workflow created successfully', workflowId })
    };

  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};

