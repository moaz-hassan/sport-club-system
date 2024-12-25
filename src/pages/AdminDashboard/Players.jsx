/* eslint-disable react/prop-types */
import { useState } from "react";
import "./admin-dashboard.css";
import DynamicForm from "../../components/DynamicForm";
import ExportExcelSheet from "../../components/ExportExcelSheet";
import { Link } from "react-router-dom";

function DashboardPlayers({ memberView }) {
  const members = [
    {
      id: 1,
      name: "Ahmed Ali",
      email: "ahmed.ali@example.com",
      phoneNumber: "123-456-7890",
      subscriptionStatus: "active",
      role: "member",
      status: "not blocked",
    },
    {
      id: 2,
      name: "Mohammed Yasin",
      email: "mohammed.yasin@example.com",
      phoneNumber: "234-567-8901",
      subscriptionStatus: "inactive",
      role: "coach",
      status: "blocked",
    },
    // Add similar entries for other members
  ];

  const [searchSelect, setSearchSelect] = useState("id");
  const [addMember, setAddMember] = useState(false);

  const HeaderRowObject = [
    { header: "Member Id", key: "id", width: 10 },
    { header: "Member Name", key: "name", width: 25 },
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

  const handleMenuAction = (memberId, action) => {
    console.log(`Action: ${action} for Member ID: ${memberId}`);
  };

  return (
    <div
      className="dashboard-members-wrapper"
      style={memberView !== false ? { margin: "0" } : null}
    >
      <h2 style={memberView !== false ? { marginBottom: "30px" } : null}>Players</h2>
      <div className="dashboard-members-header">
        <div className="search-div">
          <input
            type="search"
            placeholder={searchSelect === "id" ? "Search by id" : "Search"}
            className="dashboard-members-search-bar"
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
            <option value="status">Status</option>
          </select>
        </div>
        {memberView === true && (<Link to="/admin-dashboard/players">See more</Link>)}
        {memberView === false && (
          <div className="dashboard-members-controls">
            <button
              className="dashboard-members-add-btn"
              onClick={() => {
                setAddMember(true);
              }}
            >
              Add Player
            </button>
            <ExportExcelSheet
              FileName="Members"
              RowsObject={members}
              HeaderRowObject={HeaderRowObject}
            />
          </div>
        )}
      </div>
      <div className="dashboard-members-table-wrapper">
        <table className="dashboard-members-table">
          <thead>
            <tr>
              <th>Player Id</th>
              <th>Player Name</th>
              <th>Status</th>
              <th>Match Plan</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td
                  className={
                    searchSelect === "id" ? "dashboard-search-element" : null
                  }
                >
                  {member.id}
                </td>
                <td
                  className={
                    searchSelect === "name" ? "dashboard-search-element" : null
                  }
                >
                  {member.name}
                </td>
                <td
                  className={
                    searchSelect === "status"
                      ? "dashboard-search-element"
                      : null
                  }
                >
                  <select
                    className="actions-select"
                    onChange={(e) =>
                      handleMenuAction(member.id, e.target.value)
                    }
                  >
                    <option value="user-active">Active</option>
                    <option value="block">Block</option>
                  </select>
                </td>
                <td>
                  <select
                    className="actions-select"
                    onChange={(e) =>
                      handleMenuAction(member.id, e.target.value)
                    }
                  >
                    <option value="">Select Action</option>
                    <option value="start">In the starting lineup</option>
                    <option value="sub">substitution</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addMember === true ? (
        <DynamicForm setStatus={setAddMember} api="" formType="addPlayer" />
      ) : null}
    </div>
  );
}

export default DashboardPlayers;
