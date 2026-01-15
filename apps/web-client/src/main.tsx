import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  const [stats, setStats] = useState({ totalPatients: 0, emergencyCases: 0, availableBeds: 0 });

  const fetchStats = () => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Make sure your backend is running!", err));
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#2c3e50' }}>🏥 HMS Admin Portal</h1>
        <button onClick={fetchStats} style={buttonStyle}>🔄 Refresh Stats</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <StatCard title="Total Patients" value={stats.totalPatients} color="#3498db" />
        <StatCard title="Emergency" value={stats.emergencyCases} color="#e74c3c" />
        <StatCard title="Beds Available" value={stats.availableBeds} color="#2ecc71" />
      </div>

      <div style={tableContainerStyle}>
        <h3>Recent Patient Activity</h3>
        <p style={{ color: '#7f8c8d' }}>Data currently synced with MongoDB: <strong>hms_db</strong></p>
      </div>
    </div>
  );
};

// Helper Components for a cleaner look
const StatCard = ({ title, value, color }: any) => (
  <div style={{ ...cardStyle, borderLeft: `5px solid ${color}` }}>
    <span style={{ color: '#7f8c8d', fontSize: '14px' }}>{title}</span>
    <h2 style={{ margin: '10px 0 0 0', fontSize: '28px' }}>{value}</h2>
  </div>
);

const cardStyle = {
  background: 'white', padding: '20px', borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1
};

const buttonStyle = {
  padding: '10px 20px', backgroundColor: '#2c3e50', color: 'white',
  border: 'none', borderRadius: '5px', cursor: 'pointer'
};

const tableContainerStyle = {
  marginTop: '30px', background: 'white', padding: '20px', borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);