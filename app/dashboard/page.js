"use client";

import ProtectedRoute from "components/ProtectedRoute";
import "styles/dashboard.css";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
