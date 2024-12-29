import { useEffect, useState } from "react";
import "./admin-dashboard.css";
import DynamicForm from "../../components/DynamicForm";
import ExportExcelSheet from "../../components/ExportExcelSheet";
import ApiReq from "../../hooks/apiReq";

function DashboardMembers() {
  const [plans, setPlans] = useState([]);
  const [searchSelect, setSearchSelect] = useState("id");
  const [addMember, setAddMember] = useState(false);

  useEffect(() => {
    ApiReq("api/get_subscription_plane", "GET", setPlans);
  }, []);

  const HeaderRowObject = [
    { header: "Member Id", key: "id", width: 10 },
    { header: "Member Name", key: "name", width: 25 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone Number", key: "phoneNumber", width: 20 },
    { header: "Subscription Status", key: "subscriptionStatus", width: 20 },
    { header: "Role", key: "role", width: 15 },
    { header: "Status", key: "status", width: 15 },
  ];

  function SelectOnChange(event) {
    document.querySelector(".dashboard-members-search-bar").value = "";
    const SearchElements = document.querySelectorAll(
      ".dashboard-members-table tbody tr"
    );
    for (let i = 0; i < SearchElements.length; i++) {
      SearchElements[i].style.display = "table-row";
    }
    setSearchSelect(event.target.value);
  }

  function SearchFunc(event) {
    const searchInput = event.target;
    const SearchElements = document.querySelectorAll(
      ".dashboard-members-table tbody tr .dashboard-search-element"
    );
    const searchValue = searchInput.value.toLowerCase();
    for (let i = 0; i < SearchElements.length; i++) {
      if (SearchElements[i].textContent.toLowerCase().includes(searchValue)) {
        SearchElements[i].parentElement.style.display = "table-row";
      } else {
        SearchElements[i].parentElement.style.display = "none";
      }
    }
  }

  const handleDelete = (planId) => {
    ApiReq(`api/delete_subscription_plan/${planId}`, "DELETE", () => {
      setPlans((prevPlans) => ({
        ...prevPlans,
        data: prevPlans.data.filter((plan) => plan.Subscription_ID !== planId),
      }));
    });
  };

  return (
    <div className="dashboard-members-wrapper">
      <h2>Plans</h2>
      <div className="dashboard-members-header">
        <div className="search-div">
          <input
            type="search"
            placeholder={searchSelect === "id" ? "Search by id" : "Search"}
            className="dashboard-members-search-bar"
            onChange={SearchFunc}
          />
          <select id="search-select" onChange={SelectOnChange}>
            <option value="id">Id</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="dashboard-members-controls">
          <button
            className="dashboard-members-add-btn"
            onClick={() => setAddMember(true)}
          >
            Add Plan
          </button>
          <ExportExcelSheet
            FileName="Plans"
            RowsObject={plans}
            HeaderRowObject={HeaderRowObject}
          />
        </div>
      </div>
      <div className="dashboard-members-table-wrapper">
        <table className="dashboard-members-table">
          <thead>
            <tr>
              <th>Plan Id</th>
              <th>Plan Name</th>
              <th>Plan Type</th>
              <th>Price / month</th>
            </tr>
          </thead>
          <tbody>
            {plans.data?.map((plan) => (
              <tr key={plan.Subscription_ID}>
                <td
                  className={
                    searchSelect === "id" ? "dashboard-search-element" : null
                  }
                >
                  {plan.Subscription_ID}
                </td>
                <td
                  className={
                    searchSelect === "name" ? "dashboard-search-element" : null
                  }
                >
                  {plan.Subscription_Name}
                </td>
                <td>{plan.Subscription_Plan_type}</td>
                <td>{plan.Subscription_Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addMember && (
        <DynamicForm
        status={addMember}
          setStatus={setAddMember}
          endPoint="api/add_subscription_plane"
          formType="addSubscriptionPlan"
        />
      )}
    </div>
  );
}

export default DashboardMembers;
