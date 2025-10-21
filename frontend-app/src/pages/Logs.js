import React, { useEffect, useState } from 'react';

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch('https://<YOUR_API_GATEWAY_URL>/workflow/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflowId: 'sample-workflow', status: 'pending' })
      });
      const data = await response.json();
      setLogs([data]);
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Workflow Logs</h2>
      {logs.length === 0 ? (
        <p>No logs yet</p>
      ) : (
        logs.map((log, idx) => (
          <div key={idx}>
            <p>WorkflowId: {log.workflowId}</p>
            <p>Status: {log.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Logs;
