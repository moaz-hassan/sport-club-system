import { useState } from "react";
import "./admin-dashboard.css";
import DynamicForm from "../../components/DynamicForm";
import ExportExcelSheet from "../../components/ExportExcelSheet";

function DashboardMatches() {
  const matches = [
    {
      matchId: 1,
      date: "2024-01-15",
      location: "Stadium A",
      team1: "Falcon Warriors",
      team2: "Ocean Explorers",
      time: "15:00",
      champion: "Falcon Warriors",
    },
    {
      matchId: 2,
      date: "2024-01-20",
      location: "Stadium B",
      team1: "Mountain Climbers",
      team2: "Desert Rangers",
      time: "18:00",
      champion: "Mountain Climbers",
    },
    {
      matchId: 3,
      date: "2024-02-05",
      location: "Stadium C",
      team1: "Sky Flyers",
      team2: "Tech Titans",
      time: "20:00",
      champion: "Sky Flyers",
    },
    {
      matchId: 4,
      date: "2024-02-10",
      location: "Stadium D",
      team1: "River Riders",
      team2: "Forest Rangers",
      time: "17:00",
      champion: "River Riders",
    },
    {
      matchId: 5,
      date: "2024-02-15",
      location: "Stadium E",
      team1: "Polar Explorers",
      team2: "Sunset Surfers",
      time: "19:00",
      champion: "Sunset Surfers",
    },
  ];

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
            {matches.map((match) => (
              <tr key={match.matchId}>
                <td
                  className={
                    searchSelect === "id" ? "dashboard-search-element" : null
                  }
                >
                  {match.matchId}
                </td>
                <td
                  className={
                    searchSelect === "date" ? "dashboard-search-element" : null
                  }
                >
                  {match.date}
                </td>
                <td>{match.location}</td>
                <td
                  className={
                    searchSelect === "team1" ? "dashboard-search-element" : null
                  }
                >
                  {match.team1}
                </td>
                <td
                  className={
                    searchSelect === "team2" ? "dashboard-search-element" : null
                  }
                >
                  {match.team2}
                </td>
                <td>{match.time}</td>
                <td>{match.champion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addMatch === true ? (
        <DynamicForm setStatus={setAddMatch} api="" formType="addMatch" />
      ) : null}
    </div>
  );
}

export default DashboardMatches;
