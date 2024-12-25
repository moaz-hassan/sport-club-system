import { useState } from "react";
import DashboardAside from "./DashboardAside";
import DashboardNav from "./DashboardNav";
import { useLocation } from "react-router-dom";
import DashboardTeams from "./DashboardTeams";
import DashboardOverview from "./DashboardOverview";
import DashboardSubscription from "./DashboardSubscription";
import DashboardMembers from "./DashboardMembers";
import "./admin-dashboard.css";
import Profile from "./Profile";
import DashboardPlayers from "./Players";
function AdminDashboard() {
  const Location = useLocation();

  const [asideShow, setAsideShow] = useState(true);

  return (
    <div className="admin-dashboard-container">
      <DashboardAside asideShow={asideShow} setAsideShow={setAsideShow} />
      <div className="right-side">
        <DashboardNav asideShow={asideShow} setAsideShow={setAsideShow} />
        <div className="content">
          {Location.pathname === "/admin-dashboard/overview" ? (
            <DashboardOverview />
          ) : Location.pathname === "/admin-dashboard/teams" ? (
            <DashboardTeams />
          ) : Location.pathname === "/admin-dashboard/subscriptions" ? (
            <DashboardSubscription />
          ) : Location.pathname === "/admin-dashboard/players" ? (
            <DashboardPlayers memberView={false}/>
          ) : Location.pathname === "/admin-dashboard/members" ? (
            <DashboardMembers memberView={false}/>
          ) : Location.pathname === "/admin-dashboard/profile" ? (
            <Profile />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
