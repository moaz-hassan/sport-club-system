/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ApiReq from "../hooks/apiReq";

function DynamicForm({ formType, endPoint, setStatus ,status}) {
  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); // State to manage button enabled/disabled

  const addTeamFields = [
    { name: "Team_name", placeholder: "Team Name", type: "text", required: true },
    { name: "Team_type", placeholder: "Team type", type: "text", required: true },
  ];
  const addMatchFields = [
    { name: "match_team1", placeholder: "Team 1", type: "text", required: true },
    { name: "match_team2", placeholder: "Team 2", type: "text", required: true },
    { name: "match_date", placeholder: "Match Date", type: "date", required: true },
    { name: "match_start_time", placeholder: "Match Time", type: "time", required: true },
    { name: "match_location", placeholder: "Location", type: "text", required: true },
    { name: "match_champoin", placeholder: "Champion", type: "text", required: true },
  ];
  const addMemberFields = [
    { name: "userName", placeholder: "Member Name", type: "text", required: true },
    { name: "Role", placeholder: "Role", type: "text", required: true },
    { name: "email", placeholder: "Email", type: "email", required: true },
    { name: "number", placeholder: "Phone", type: "tel", required: true },
    { name: "birthDate", placeholder: "Birth date", type: "date", required: true },
    { name: "password", placeholder: "Password", type: "password", required: true },
  ];

  const addPlayerFields = [
    { name: "userName", placeholder: "Player Name", type: "text", required: true },
    { name: "Role", placeholder: "Role", type: "text", required: true },
    { name: "email", placeholder: "Email", type: "email", required: true },
    { name: "number", placeholder: "Phone", type: "tel", required: true },
    { name: "birthDate", placeholder: "Birth Date", type: "date", required: true },
    { name: "password", placeholder: "Password", type: "password", required: true },
    { name: "team_id", placeholder: "Team ID", type: "text", required: true }, // New field
    { name: "teammember_position", placeholder: "Position", type: "text", required: true }, // New field
    { name: "teammember_status", placeholder: "Status", type: "text", required: true }, // New field
  ];

  const addSubscriptionPlanFields = [
    { name: "Subscription_Name", placeholder: "Plan Name", type: "text", required: true },
    { name: "Subscription_Amount", placeholder: "Price", type: "number", required: true },
    { name: "Subscription_Plan_type", placeholder: "Type", type: "text", required: true },
  ];

  const getFormFields = () => {
    switch (formType) {
      case "addTeam":
        return addTeamFields;
      case "addMatch":
        return addMatchFields;
      case "addMember":
        return addMemberFields;
      case "addPlayer":
        return addPlayerFields;
      case "addSubscriptionPlan":
        return addSubscriptionPlanFields;
      default:
        return [];
    }
  };

  const formFields = getFormFields();

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Check if the form is valid (all required fields are filled)
  useEffect(() => {
    const isValid = formFields.every((field) =>
      field.required ? formData[field.name]?.trim() !== "" : true
    );
    setIsFormValid(isValid);
  }, [formData]);

  console.log(formData);
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send formData directly to the API
    ApiReq(endPoint, "POST", null, formData);
  };

  return (
    <div className="modal-overlay" style={{overflow:"auto"}}>
      <div className="modal-content" style={{overflow:"auto",marginTop:"220px"}}>
        <h3>
          {formType === "addTeam" && "Add New Team"}
          {formType === "addMember" && "Add New Member"}
          {formType === "addSubscriptionPlan" && "Add New Subscription Plan"}
        </h3>

        <form onSubmit={handleSubmit} style={{overflow:"auto"}}>
          {formFields.map((field) => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.placeholder}</label>
              <input
                style={{ border: "1px solid black" }}
                type={field.type || "text"}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required={field.required || false}
              />
            </div>
          ))}
          <div className="modal-actions">
            <button
              type="submit"
              className="modal-save-btn"
              disabled={!isFormValid} // Disable button if form is invalid
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus(!status);
              }}
              className="modal-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DynamicForm;
