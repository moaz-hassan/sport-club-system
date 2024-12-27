import { useState } from "react";
import "./admin-dashboard.css";
import DynamicForm from "../../components/DynamicForm";
import ExportExcelSheet from "../../components/ExportExcelSheet";

function DashboardTeams() {
  const teams = [
    { teamId: 1, teamName: "Falcon Warriors", teamType: "A" },
    { teamId: 2, teamName: "Ocean Explorers", teamType: "B" },
    { teamId: 3, teamName: "Mountain Climbers", teamType: "C" },
    { teamId: 4, teamName: "Desert Rangers", teamType: "A" },
    { teamId: 5, teamName: "Sky Flyers", teamType: "B" },
    { teamId: 6, teamName: "Tech Titans", teamType: "C" },
    { teamId: 7, teamName: "River Riders", teamType: "A" },
    { teamId: 8, teamName: "Forest Rangers", teamType: "B" },
    { teamId: 9, teamName: "Polar Explorers", teamType: "C" },
    { teamId: 10, teamName: "Sunset Surfers", teamType: "A" },
  ];

  const [searchSelect, setSearchSelect] = useState("id");
  const [addTeam, setAddTeam] = useState(false);

  const HeaderRowObject = [
    { header: "Team Id", key: "teamId", width: 10 },
    { header: "Team Name", key: "teamName", width: 20 },
    { header: "Team Type", key: "teamType", width: 15 },
  ];

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

  function SearchFunc(event) {
    const searchInput = event.target;
    const SearchElements = document.querySelectorAll(
      ".dashboard-teams-table tbody tr .dashboard-search-element"
    );
    const searchValue = searchInput.value;
    for (let i = 0; i < SearchElements.length; i++) {
      if (
        SearchElements[i].textContent
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      ) {
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
            onChange={(event) => {
              SearchFunc(event);
            }}
          />
          <select
            id="search-select"
            onChange={(event) => {
              SelectOnChange(event);
            }}
          >
            <option value="id">Id</option>
            <option value="name">Name</option>
            <option value="teamType">Type</option>
          </select>
        </div>
        <div className="dashboard-teams-controls">
          <button
            className="dashboard-teams-add-btn"
            onClick={() => {
              setAddTeam(true);
            }}
          >
            Add Team
          </button>
          <ExportExcelSheet
            FileName="Teams"
            RowsObject={teams}
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
            {teams.map((team) => (
              <tr key={team.teamId}>
                <td
                  className={
                    searchSelect === "id" ? "dashboard-search-element" : null
                  }
                >
                  {team.teamId}
                </td>
                <td
                  className={
                    searchSelect === "name" ? "dashboard-search-element" : null
                  }
                >
                  {team.teamName}
                </td>
                <td
                  className={
                    searchSelect === "teamType" ? "dashboard-search-element" : null
                  }
                >
                  {team.teamType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addTeam === true ? (
        <DynamicForm setStatus={setAddTeam} api="" formType="addTeam" />
      ) : null}
    </div>
  );
}

export default DashboardTeams;
