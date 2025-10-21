import React, { useState } from 'react';

function WorkflowForm() {
  const [workflowName, setWorkflowName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://api-gateway-endpoint.amazonaws.com/prod', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: 'sample-user', triggerType: workflowName })
});


    const data = await response.json();
    alert(data.message || 'Workflow created');
  };

  return (
    <div>
      <h2>Create a New Workflow</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workflow Name"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default WorkflowForm;
