/* eslint-disable react/prop-types */
import { useState } from "react";
import "./admin-dashboard.css";
import DynamicForm from "../../components/DynamicForm";
import ExportExcelSheet from "../../components/ExportExcelSheet";
import { Link } from "react-router-dom";

function DashboardMembers({ memberView }) {
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
      `${event.target} tbody tr .dashboard-search-element`
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
      <h2>Members</h2>
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
            <option value="email">Email</option>
            <option value="phone-number">Phone Number</option>
            <option value="subscription-status">Subscription Status</option>
            <option value="role">Role</option>
            <option value="status">Status</option>
          </select>
        </div>
        {memberView === true && (
          <Link to="/admin-dashboard/members">See more</Link>
        )}

        {memberView === false && (
          <div className="dashboard-members-controls">
            <button
              className="dashboard-members-add-btn"
              onClick={() => {
                setAddMember(true);
              }}
            >
              Add Member
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
              <th>Member Id</th>
              <th>Member Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Subscription Status</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
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
                    searchSelect === "email" ? "dashboard-search-element" : null
                  }
                >
                  {member.email}
                </td>
                <td
                  className={
                    searchSelect === "phone-number"
                      ? "dashboard-search-element"
                      : null
                  }
                >
                  {member.phoneNumber}
                </td>
                <td
                  className={
                    searchSelect === "subscription-status"
                      ? "dashboard-search-element"
                      : null
                  }
                >
                  {member.subscriptionStatus}
                </td>
                <td
                  className={
                    searchSelect === "role" ? "dashboard-search-element" : null
                  }
                >
                  {member.role}
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
                    <option value="makeAdmin">Make Admin</option>
                    <option value="block">Block</option>
                    <option value="makeCoach">Make Coach</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addMember === true ? (
        <DynamicForm setStatus={setAddMember} api="" formType="addMember" />
      ) : null}
    </div>
  );
}

export default DashboardMembers;
