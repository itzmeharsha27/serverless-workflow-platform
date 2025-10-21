import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import WorkflowForm from './pages/WorkflowForm';
import Logs from './pages/Logs';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/create">Create Workflow</Link>
        <Link to="/logs">Logs</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<WorkflowForm />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  );
}

export default App;
