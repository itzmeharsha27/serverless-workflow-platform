const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const WORKFLOWS_TABLE = process.env.WORKFLOWS_TABLE || 'WorkflowsTable';

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    if (!body.workflowId || !body.status) {
      return { statusCode: 400, body: JSON.stringify({ error: 'workflowId and status are required' }) };
    }

    // Update workflow status with log info
    await dynamo.update({
      TableName: WORKFLOWS_TABLE,
      Key: { workflowId: body.workflowId },
      UpdateExpression: "set #st = :s, lastUpdated = :u",
      ExpressionAttributeNames: { "#st": "status" },
      ExpressionAttributeValues: {
        ":s": body.status,
        ":u": new Date().toISOString()
      }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Workflow log updated successfully', workflowId: body.workflowId })
    };

  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
