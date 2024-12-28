import { useEffect, useState } from "react";
import "./admin-dashboard.css";
import DynamicForm from "../../components/DynamicForm";
import ExportExcelSheet from "../../components/ExportExcelSheet";
import ApiReq from "../../hooks/apiReq";

function DashboardMatches() {
  const [matches, setMatches] = useState({});

  useEffect(() => {
    ApiReq("api/Get_matchs", "GET", setMatches);
  }, []);

  const [searchSelect, setSearchSelect] = useState("id");
  const [addMatch, setAddMatch] = useState(false);

  const HeaderRowObject = [
    { header: "Match Id", key: "matchId", width: 10 },
    { header: "Date", key: "date", width: 15 },
    { header: "Location", key: "location", width: 20 },
    { header: "Team 1", key: "team1", width: 20 },
    { header: "Team 2", key: "team2", width: 20 },
    { header: "Time", key: "time", width: 10 },
    { header: "Champion", key: "champion", width: 20 },
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
      <h2>Matches</h2>
      <div className="dashboard-teams-header">
        <div className="search-div">
          <input
            type="search"
            placeholder={
              searchSelect === "id"
                ? "Search by id"
                : searchSelect === "team1"
                ? "Search by team 1"
                : searchSelect === "team2"
                ? "Search by team 2"
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
            <option value="team1">Team 1</option>
            <option value="team2">Team 2</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="dashboard-teams-controls">
          <button
            className="dashboard-teams-add-btn"
            onClick={() => {
              setAddMatch(true);
            }}
          >
            Add Match
          </button>
          <ExportExcelSheet
            FileName="Matches"
            RowsObject={matches}
            HeaderRowObject={HeaderRowObject}
          />
        </div>
      </div>
      <div className="dashboard-teams-table-wrapper">
        <table className="dashboard-teams-table">
          <thead>
            <tr>
              <th>Match Id</th>
              <th>Date</th>
              <th>Location</th>
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Time</th>
              <th>Champion</th>
            </tr>
          </thead>
          <tbody>
            {matches?.data?.map((match) => (
              <tr key={match.Match_ID}>
                <td
                  className={
                    searchSelect === "id" ? "dashboard-search-element" : null
                  }
                >
                  {match.Match_ID}
                </td>
                <td
                  className={
                    searchSelect === "date" ? "dashboard-search-element" : null
                  }
                >
                  {match.Match_Date}
                </td>
                <td>{match.Match_stadium}</td>
                <td
                  className={
                    searchSelect === "team1" ? "dashboard-search-element" : null
                  }
                >
                  {match.Match_FTeam}
                </td>
                <td
                  className={
                    searchSelect === "team2" ? "dashboard-search-element" : null
                  }
                >
                  {match.Match_STeam}
                </td>
                <td>{new Date(match?.Match_start_time * 1000)?.toLocaleString()}</td>
                <td>{match.Match_champion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addMatch === true ? (
        <DynamicForm setStatus={setAddMatch} endPoint={"api/add_match"} formType="addMatch" />
      ) : null}
    </div>
  );
}

export default DashboardMatches;
