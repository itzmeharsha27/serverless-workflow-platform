import React from 'react';

function WorkflowForm() {
  return (
    <div>
      <h2>Create a New Workflow</h2>
      <form>
        <input type="text" placeholder="Workflow Name" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default WorkflowForm;
