/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  clearEncryptedId,
  clearUserDataFromCookies,
} from "../utils/storageUtils"; 
import { useState } from "react";

const UserMegaMenu = ({ render, setRender }) => {
  const [appear, setAppear] = useState(false);
  function LogOut() {
    clearEncryptedId();
    clearUserDataFromCookies();
    alert("Logged out successfully!");
    setRender(!render);
  }
  return (
    <>
      <li
        className="user-mega-menu"
        onClick={() => {
          setAppear(!appear);
        }}
        style={appear ? { backgroundColor: "#f5f5f5" } : null}
      >
        <i className="fa-solid fa-user"></i> Hi, There
        {appear && (
          <ul>
            <li>
              <Link to={"admin-dashboard/profile"}>Profile</Link>
            </li>
            <li>Cart</li>
            <li
              onClick={() => {
                LogOut();
              }}
            >
              Logout
            </li>
          </ul>
        )}
      </li>
    </>
  );
};

export default UserMegaMenu;
