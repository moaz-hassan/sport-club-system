import MembersChart from "./overviewCompnents/MembersChart";
import SubscriptionChart from "./overviewCompnents/SubscriptionChart";
import DashboardMembers from "./DashboardMembers";
import Players from "./Players";

function DashboardOverview() {
  return (
    <div className="dashboard-overview-container">
      <div className="top-section">
        <div>
          <span>Total Revenue</span>
          <p>100$</p>
        </div>
        <div>
          <span>Total Subscriptions</span>
          <p>50</p>
        </div>
        <div>
          <span>Total Members</span>
          <p>200</p>
        </div>
        <div>
          <span>Total Members</span>
          <p>200</p>
        </div>
      </div>
      <div className="admin-analysis">
        <SubscriptionChart />
        <MembersChart />
        <DashboardMembers memberView={true}/>
        <Players memberView={true}/>
      </div>
    </div>
  );
}

export default DashboardOverview;
