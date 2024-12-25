/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

function DynamicForm({ formType, api, setStatus }) {
  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); // State to manage button enabled/disabled

  const addTeamFields = [
    { name: "teamId", placeholder: "Team ID", type: "text", required: true },
    { name: "teamName", placeholder: "Team Name", type: "text", required: true },
    { name: "city", placeholder: "City", type: "text", required: true },
    { name: "location", placeholder: "Location", type: "text", required: true },
    { name: "members", placeholder: "Number of Members", type: "number", required: true },
  ];

  const addMemberFields = [
    { name: "name", placeholder: "Member Name", type: "text", required: true },
    { name: "role", placeholder: "Role", type: "text", required: true },
    { name: "email", placeholder: "Email", type: "email", required: true },
    { name: "phone", placeholder: "Phone", type: "tel", required: true },
  ];

  const addPlayerFields = [
    { name: "name", placeholder: "Player Name", type: "text", required: true },
  ];

  const addSubscriptionPlanFields = [
    { name: "planName", placeholder: "Plan Name", type: "text", required: true },
    { name: "price", placeholder: "Price", type: "number", required: true },
    { name: "duration", placeholder: "Duration (months)", type: "number", required: true },
    { name: "features", placeholder: "Features", type: "text", required: false },
  ];

  // Function to send data to the API
  function apiReq(api, object) {
    axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      url: api,
      data: JSON.stringify(object),
    }).catch((error) => console.log(error.message));
  }

  const getFormFields = () => {
    switch (formType) {
      case "addTeam":
        return addTeamFields;
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

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Check if the form is valid (all required fields are filled)
  useEffect(() => {
    const isValid = getFormFields().every((field) => {
      return field.required ? formData[field.name]?.trim() !== "" : true;
    });
    setIsFormValid(isValid);
  }, [formData]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    apiReq(api, formData);
  };

  const formFields = getFormFields();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>
          {formType === "addTeam" && "Add New Team"}
          {formType === "addMember" && "Add New Member"}
          {formType === "addSubscriptionPlan" && "Add New Subscription Plan"}
        </h3>

        <form onSubmit={handleSubmit}>
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
              onClick={handleSubmit}
              disabled={!isFormValid} // Disable button if form is invalid
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus(false);
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
