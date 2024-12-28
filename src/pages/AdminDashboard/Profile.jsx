/* eslint-disable react/prop-types */
import {
  clearEncryptedId,
  clearUserDataFromCookies,
  getDecryptedId,
  getUserDataFromCookies,
} from "../../utils/storageUtils";
import "./profile.css";
import { useEffect, useState } from "react";
import apiReq from "../../hooks/apiReq";
import store from "../../components/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [name, setName] = useState("John Doe"); // Example name state
  const [email, setEmail] = useState("john.doe@example.com"); // Example email state
  const [phone, setPhone] = useState("123-456-7890"); // Example phone state
  const [birth, setBirth] = useState("1990-01-01"); // Example birthdate state
  const [plan, setPlan] = useState("Premium Plan"); // Example plan state
  const [password, setPassword] = useState(""); // Password state
  const payments = [
    {
      id: "P001",
      date: "2024-12-01",
      amount: "$100",
      status: "Paid",
      itemBought: "Annual Subscription",
    },
    {
      id: "P002",
      date: "2024-11-15",
      amount: "$150",
      status: "Pending",
      itemBought: "Premium Plan",
    },
    {
      id: "P003",
      date: "2024-10-20",
      amount: "$200",
      status: "Paid",
      itemBought: "One-time Event Ticket",
    },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    console.log(getUserDataFromCookies());
    setName(getUserDataFromCookies().Member_Name);
    setEmail(getUserDataFromCookies().Member_Email);
    setPhone(getUserDataFromCookies().Member_phoneNumber);
    setBirth(getUserDataFromCookies().Member_BirthDate || "2000-01-01");
    setPlan(getUserDataFromCookies().Member_subscription_status || "Free");
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  function LogOut() {
    clearEncryptedId();
    clearUserDataFromCookies();
    alert("Logged out successfully!");
    navigate("/");
    store.dispatch({ type: "resObj", payload: {} });
  }
  const handleUpdateClick = () => {
    apiReq("api/EditUserData", "POST", {
      id: getDecryptedId(),
      userName: name,
      number: phone,
      address: "",
      password: password,
    });
    setIsEditing(false);

    navigate("/login");
  };

  // apiReq("api/Get_payment_by_id", "POST", { member_id: 2});

  return (
    <div className="profile">
      <h2>Your Info</h2>
      <div className="profile-inputs">
        <label htmlFor="user-name">Name</label>
        <input
          id="user-name"
          type="text"
          placeholder="Name"
          value={name}
          disabled={!isEditing}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
          type="text"
          placeholder="Email"
          value={email}
          disabled={!isEditing}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="Phone">Phone Number</label>
        <input
          id="Phone"
          type="text"
          placeholder="Phone Number"
          value={phone}
          disabled
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="birth">Birthdate</label>
        <input
          id="birth"
          type="date"
          placeholder="Birthdate"
          value={birth}
          disabled
          onChange={(e) => setBirth(e.target.value)}
        />

        <label htmlFor="plan">Plan</label>
        <input
          id="plan"
          type="text"
          placeholder="Plan"
          value={plan}
          disabled
          onChange={(e) => setPlan(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          disabled={!isEditing}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {!isEditing ? (
        <button onClick={handleEditClick}>Edit</button>
      ) : (
        <button onClick={handleUpdateClick}>Update</button>
      )}

      <div className="payment-history">
        <h2>Payment History</h2>
        <table className="payment-history-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Item Bought</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.id}</td>
                <td>{payment.date}</td>
                <td>{payment.amount}</td>
                <td>{payment.status}</td>
                <td>{payment.itemBought}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
