import React, { useState } from 'react';
import '../components/Dashboard/Dashboard.css';

import DashboardGame from '../components/Dashboard/DashboardGame';
import AnalyticsTab from '../components/Dashboard/DashboardGame';
import SettingsTab from '../components/Dashboard/DashboardGame';

function Dashboard() {
  const [activeTab, setActiveTab] = useState("DashboardGame");

  const renderTabContent = () => {
    switch (activeTab) {
      case "DashboardGame":
        return <DashboardGame />;
      case "analytics":
        return <AnalyticsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="tabs">
        <button 
          className={activeTab === "DashboardGame" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("DashboardGame")}
        >
          Games
        </button>

        <button 
          className={activeTab === "analytics" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>

        <button 
          className={activeTab === "settings" ? "tab active" : "tab"} 
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Dashboard;
