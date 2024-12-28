import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import store from "../../components/store";
import ApiReq from "../../hooks/apiReq";
import { getDecryptedId } from "../../utils/storageUtils";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // useEffect(() => {
  //   if(getDecryptedId()){
  //     navigate("/");
  //   }
  // }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }
  };

  function logInRequest() {
    ApiReq("api/login", "POST", {
      username: userName,
      Password: password,
    },navigate);
  }
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {errorMessage && (
          <div className="login-error-message">{errorMessage}</div>
        )}

        <div className="login-input-container">
          <input
            type="text"
            id="login-username"
            className={`login-input ${userName ? "not-empty" : ""}`}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label htmlFor="login-username" className="login-label">
            Username
          </label>
        </div>

        <div className="login-input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="login-password"
            className={`login-input ${password ? "not-empty" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="login-password" className="login-label">
            Password
          </label>
          <i
            className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: "10px",
              top: "15px",
              cursor: "pointer",
            }}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              logInRequest();
            }}
          >
            Login
          </button>
        </div>

        <div className="login-links">
          <Link to="/sign-up">Register</Link>
          <Link to="/reset-password">Forgot Password</Link>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default Login;
