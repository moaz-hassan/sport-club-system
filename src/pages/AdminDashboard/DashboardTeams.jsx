import { useEffect, useState } from "react";
import "./admin-dashboard.css";
import DynamicForm from "../../components/DynamicForm";
import ExportExcelSheet from "../../components/ExportExcelSheet";
import ApiReq from "../../hooks/apiReq";

function DashboardTeams() {
  const [teams, setTeams] = useState({});
  const [searchSelect, setSearchSelect] = useState("id");
  const [addTeam, setAddTeam] = useState(false);

  const HeaderRowObject = [
    { header: "Team Id", key: "teamId", width: 10 },
    { header: "Team Name", key: "teamName", width: 20 },
    { header: "Team Type", key: "teamType", width: 15 },
  ];

  // Fetch teams on component mount
  useEffect(() => {
    ApiReq("api/Get_teams", "GET", setTeams);
  }, []);


  // Handle search select dropdown changes
  function SelectOnChange(event) {
    document.querySelector(".dashboard-teams-search-bar").value = "";
    const SearchElements = document.querySelectorAll(
      ".dashboard-teams-table tbody tr"
    );
    for (let i = 0; i < SearchElements.length; i++) {
      SearchElements[i].style.display = "table-row";
    }
    setSearchSelect(event.target.value);
  }

  // Search functionality
  function SearchFunc(event) {
    const searchInput = event.target;
    const SearchElements = document.querySelectorAll(
      ".dashboard-teams-table tbody tr .dashboard-search-element"
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

  return (
    <div className="dashboard-teams-wrapper">
      <h2>Teams</h2>
      <div className="dashboard-teams-header">
        <div className="search-div">
          <input
            type="search"
            placeholder={
              searchSelect === "id"
                ? "Search by id"
                : searchSelect === "name"
                ? "Search by name"
                : "Search"
            }
            className="dashboard-teams-search-bar"
            onChange={SearchFunc}
          />
          <select id="search-select" onChange={SelectOnChange}>
            <option value="id">Id</option>
            <option value="name">Name</option>
            <option value="teamType">Type</option>
          </select>
        </div>
        <div className="dashboard-teams-controls">
          <button
            className="dashboard-teams-add-btn"
            onClick={() => setAddTeam(true)}
          >
            Add Team
          </button>
          <ExportExcelSheet
            FileName="Teams"
            RowsObject={teams.data}
            HeaderRowObject={HeaderRowObject}
          />
        </div>
      </div>
      <div className="dashboard-teams-table-wrapper">
        <table className="dashboard-teams-table">
          <thead>
            <tr>
              <th>Team Id</th>
              <th>Team Name</th>
              <th>Team Type</th>
            </tr>
          </thead>
          <tbody>
            {teams.data?.length > 0 ? (
              teams.data.map((team) => (
                <tr key={team.Team_ID}>
                  <td
                    className={
                      searchSelect === "id" ? "dashboard-search-element" : null
                    }
                  >
                    {team.Team_ID}
                  </td>
                  <td
                    className={
                      searchSelect === "name" ? "dashboard-search-element" : null
                    }
                  >
                    {team.Team_Name}
                  </td>
                  <td
                    className={
                      searchSelect === "teamType"
                        ? "dashboard-search-element"
                        : null
                    }
                  >
                    {team.Team_Type}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No teams available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {addTeam && (
        <DynamicForm setStatus={setAddTeam} api="api/Add_team" formType="addTeam" />
      )}
    </div>
  );
}

export default DashboardTeams;
