import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }
    setErrorMessage("");
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} method="post">
        <h2>Login</h2>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            value={userName}
            onChange={(event) => {
              handleUserNameChange(event);
            }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => {
              handlePasswordChange(event);
            }}
          />
          <i
            className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            style={{
              position: "absolute",
              right: "12px",
              top: "15px",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        {errorMessage && (
          <div className="error">
            {errorMessage}
          </div>
        )}

        <div>
          <input type="submit" value="Login" />
        </div>

        <div>
          <Link to="/sign-up">Register</Link>
          <Link to="/reset-password">Forgot Password</Link>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default Login;
