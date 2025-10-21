const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const WORKFLOWS_TABLE = process.env.WORKFLOWS_TABLE || 'WorkflowsTable';

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    if (!body.workflowId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'workflowId is required' }) };
    }

    // Fetch the workflow
    const workflow = await dynamo.get({
      TableName: WORKFLOWS_TABLE,
      Key: { workflowId: body.workflowId }
    }).promise();

    if (!workflow.Item) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Workflow not found' }) };
    }

    // Simulate triggering the workflow
    await dynamo.update({
      TableName: WORKFLOWS_TABLE,
      Key: { workflowId: body.workflowId },
      UpdateExpression: "set #st = :s",
      ExpressionAttributeNames: { "#st": "status" },
      ExpressionAttributeValues: { ":s": "triggered" }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Workflow triggered successfully', workflowId: body.workflowId })
    };

  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
