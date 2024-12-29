/* eslint-disable react/prop-types */
import { LuPanelLeftClose } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/4843042_ball_game_play_sport_tennis_icon.jpg";
import "./admin-dashboard.css";
import { useEffect } from "react";
import { getUserDataFromCookies } from "../../utils/storageUtils";
import store from "../../components/store";

function DashboardAside({ asideShow, setAsideShow }) {
  const location = useLocation();
  useEffect(() => {
    function calculatePageWidth() {
      const func_width = window.innerWidth;
      if (func_width > 1100) {
        setAsideShow(true);
      } else {
        setAsideShow(false);
      }
      window.addEventListener("resize", calculatePageWidth);
    }
    calculatePageWidth();
  }, [setAsideShow]);
  const isAdmin =
    getUserDataFromCookies()?.Member_Role === "admin" ||
    store.getState().resObj.data?.Member_Role === "admin";
  return (
    <aside
      className="admin-dashboard-aside"
      style={asideShow ? { left: "0" } : { left: "-100%" }}
    >
      <div className="admin-aside-header">
        <LuPanelLeftClose
          className="aside-header-close-icon"
          onClick={() => setAsideShow(false)}
        />
        <img src={logo} alt="Logo" />
        <h2>Sport Club System</h2>
      </div>
      <ul>
        <li
          style={
            location.pathname === "/admin-dashboard/profile"
              ? { backgroundColor: "#4CAF50" }
              : null
          }
        >
          <Link to="/admin-dashboard/profile">Profile</Link>
        </li>
        {isAdmin && (
          <>
            <li
              style={
                location.pathname === "/admin-dashboard/overview"
                  ? { backgroundColor: "#4CAF50" }
                  : null
              }
            >
              <Link to="/admin-dashboard/overview">Overview</Link>
            </li>
            <li
              style={
                location.pathname === "/admin-dashboard/players"
                  ? { backgroundColor: "#4CAF50" }
                  : null
              }
            >
              <Link to="/admin-dashboard/players">Players</Link>
            </li>
            <li
              style={
                location.pathname === "/admin-dashboard/members"
                  ? { backgroundColor: "#4CAF50" }
                  : null
              }
            >
              <Link to="/admin-dashboard/members">Members</Link>
            </li>
            <li
              style={
                location.pathname === "/admin-dashboard/subscriptions"
                  ? { backgroundColor: "#4CAF50" }
                  : null
              }
            >
              <Link to="/admin-dashboard/subscriptions">Subscriptions</Link>
            </li>
            <li
              style={
                location.pathname === "/admin-dashboard/teams"
                  ? { backgroundColor: "#4CAF50" }
                  : null
              }
            >
              <Link to="/admin-dashboard/teams">Teams</Link>
            </li>
            <li
              style={
                location.pathname === "/admin-dashboard/matches"
                  ? { backgroundColor: "#4CAF50" }
                  : null
              }
            >
              <Link to="/admin-dashboard/matches">Matches</Link>
            </li>
            <li
              style={
                location.pathname === "/admin-dashboard/store"
                  ? { backgroundColor: "#4CAF50" }
                  : null
              }
            >
              <Link to="/admin-dashboard/store">Store</Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default DashboardAside;
