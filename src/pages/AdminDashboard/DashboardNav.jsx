/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import logo from "../../../public/4843042_ball_game_play_sport_tennis_icon.jpg";
import "./admin-dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import {
  clearEncryptedId,
  clearUserDataFromCookies,
  getUserDataFromCookies,
} from "../../utils/storageUtils";
import store from "../../components/store";
function DashboardNav({ setAsideShow, asideShow }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      document.querySelector(".profile-section").style.backgroundColor =
        "#d8d8d83d";
    } else {
      document.querySelector(".profile-section").style.backgroundColor =
        "transparent";
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  function onToggleSidebar() {
    if (asideShow) {
      setAsideShow(false);
    } else {
      setAsideShow(true);
    }
  }

  function LogOut() {
    clearEncryptedId();
    clearUserDataFromCookies();
    store.dispatch({ type: "resObj", payload: {} });
    alert("Logged out successfully!");
    navigate("/");
  }

  return (
    <nav className="dashboard-nav">
      <div className="nav-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <FiMenu size={24} />
        </button>
        <img className="logo" src={logo} alt="Logo"></img>
      </div>
      <div className="nav-right">
        <div className="profile-section" onClick={toggleDropdown}>
          <span>Hi, </span>
          <span className="admin-name">
            {getUserDataFromCookies().Member_Name}
          </span>
        </div>
        <div className="dropdown">
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/admin-dashboard/profile" className="dropdown-item">
                <FiUser /> Profile
              </Link>
              <button
                className="dropdown-item logout"
                onClick={() => {
                  LogOut();
                }}
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
