/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./admin-dashboard.css";
import DynamicForm from "../../components/DynamicForm";
import ExportExcelSheet from "../../components/ExportExcelSheet";
import { Link } from "react-router-dom";
import ApiReq from "../../hooks/apiReq";

function DashboardPlayers({ memberView }) {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    ApiReq("api/Get_users", "GET", setPlayers);
  }, []);

  useEffect(() => {
    if (players.data) {
      setFilteredPlayers(players.data.filter((p) => p.Member_Role === "Player"));
    }
  }, [players]);

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
              FileName="Players"
              RowsObject={filteredPlayers}
              HeaderRowObject={HeaderRowObject}
            />
          </div>
        )}
      </div>
      <div className="dashboard-members-table-wrapper">
        <table className="dashboard-members-table">
          <thead>
            <tr>
              <th>Member Id</th>
              <th>Member Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers?.map((member) => (
              <tr key={member.Member_ID}>
                <td
                  className={
                    searchSelect === "id" ? "dashboard-search-element" : null
                  }
                >
                  {member.Member_ID}
                </td>
                <td
                  className={
                    searchSelect === "name" ? "dashboard-search-element" : null
                  }
                >
                  {member.Member_Name}
                </td>
                <td
                  className={
                    searchSelect === "email" ? "dashboard-search-element" : null
                  }
                >
                  {member.Member_Email}
                </td>
                <td
                  className={
                    searchSelect === "phone-number"
                      ? "dashboard-search-element"
                      : null
                  }
                >
                  {member.Member_phone}
                </td>
                <td
                  className={
                    searchSelect === "role" ? "dashboard-search-element" : null
                  }
                >
                  {member.Member_Role}
                </td>
                <td
                  className={
                    searchSelect === "status"
                      ? "dashboard-search-element"
                      : null
                  }
                >
                  {member.Member_status === "Active" ? (
                    <button
                      onClick={() => {
                        ApiReq("api/edit_person_data", "POST", {
                          member_id: member.Member_ID,
                          user_name: member.Member_Name,
                          number: member.Member_phone,
                          birth_date: member.Member_BirthDate,
                          email: member.Member_Email,
                          member_role: member.Member_Role,
                          member_status: "inactive",
                        });
                      }}
                    >
                      Block
                    </button>
                  ) : (
                    <button>Active</button>
                  )}
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
